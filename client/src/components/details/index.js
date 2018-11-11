import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './index.scss';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

@observer(['items'])
class Details extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: null
    };
  }

  componentWillMount() {
    /** Check and fetch data when first time component render */
    let id = this.props.match.params.id;
    if (id) {
      this.props.items.show(id, (item) => {
        if (item) {
          this.setState({item});
        }
      });
    }
  }
  
  componentDidUpdate(prevProps) {
    /** check and refetch data whene id changed */
    let id = this.props.match.params.id;
    if (prevProps.match.params.id !== id) {
      this.props.items.show(id, (item) => {
          if (item) {
            this.setState({item});
          }
        });
    }
  }

  handleOnEdit = (e, id) => {
    e.preventDefault();
    this.props.history.push(`/items/${id}/edit`);
  }

  /** Render single item title */
  renderItem = () => {
    let id = this.props.match.params.id
    return (
      <div>
        <div className='title'>
            <h3>{this.state.item.title}</h3>
            {id && <Link to="#" onClick={(e) => this.handleOnEdit(e, id)}>Edit</Link>}
        </div>
        <div className='description'>{this.state.item.description}</div>
      </div>
    )
  }

  /** Render Empty Dialog */
  renderEmpty = () => {
    return (
      <div className="error">
        Select something from item list ...
      </div>
    )
  }

  render() {
    return (
      <div className='content-area'>
        <div className='content container'>
          { (this.state.item ? this.renderItem() : this.renderEmpty()) }
        </div>
      </div>
    )
  }
}

export default withRouter(Details);