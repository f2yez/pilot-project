import React, { Component } from 'react'
import './index.scss';
import { observer } from 'mobx-react';

@observer(['items'])
class ItemForm extends Component {

  constructor(props) {
    super(props);
    this.state = { id: null, title: '', description: '', error: null };
  }

  componentWillMount() {
    /** Check and fetch data when first time component render */
    let id = this.props.match.params.id;
    if (id) {
      this.props.items.show(id, (item) => {
        if (item) {
          let { id, title, description } = item;
          this.setState({ id, title, description });
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
            let { id, title, description } = item;
            this.setState({ id, title, description });
          }
        });
    }
  }

  /** Get value from input and textarea */
  handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    this.setState({[name]: value});
  }

  /** validation and submit form */
  handleSubmit = (e) => {
    e.preventDefault();
    let { title, description, id } = this.state;
    if (title && description) {
      if (id) {
        this.props.items.edit(id, {
          title, description
        }, (item) => {
          if (this.props.items.isFailure) {
            this.setState({error: "Something error while saving data."});
          } else {
            this.props.history.push(`/items/${item.id}/edit`);
          }
        });
      } else {
        this.props.items.create({
          title, description
        }, (item) => {
          if (this.props.items.isFailure) {
            this.setState({error: "Something error while saving data."});
          } else {
            this.props.history.push(`/items/${item.id}`);
          }
        });
      }
    } else {
      this.setState({error: "Please fill all fields"});
    }
  }

  renderError = () => {
    return (
      <div className="error">{this.state.error}</div>
    );
  }

  render() {
    return (
      <div className='form-area'>
        <div>
          <h2>{ this.state.id ? 'Edit item' : 'Create new item'}</h2>
        </div>
        {this.state.error && this.renderError()}
        <form onSubmit={this.handleSubmit}>
          <div className="title-area">
            <label>Title</label>
            <input onChange={this.handleChange} name="title" placeholder="Enter a title" type="text" value={ this.state.title }/>
          </div>
          <div className="description-area">
            <label>Description</label>
            <textarea onChange={this.handleChange} name="description" placeholder="Enter a description" value={ this.state.description }></textarea>
          </div>
          <div className="save-btn-area">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    )
  }
}

export default ItemForm;