import React from 'react';
import './index.scss';
import Item from './item';
import { observer } from 'mobx-react';

@observer(['items'])
class Sidebar extends React.Component {
  
  componentDidMount() {
    /** Fetch Items */
    this.props.items.getItems({});
  }

  /** Render List of items */
  renderItems = () => {
    return this.props.items.all.map(item => 
      <Item key={ item.id } item={ item } />  
    );
  }

  next = (e) => {
    e.preventDefault();
    let { limit, skip } = this.props.items;
    this.props.items.getItems({ $limit: limit, $skip: limit + skip });
  }
  
  prev = (e) => {
    e.preventDefault();
    let { limit, skip } = this.props.items;
    this.props.items.getItems({ $limit: limit, $skip: skip - limit });
  }

  /** Render Next and Previous btns */
  renderPages = () => {
    let { canPrev, canNext } = this.props.items;
    return (
      <div>
        {<a href="#" onClick={ this.prev } className="prev">Previous</a>}
        {<a href="#" onClick={ this.next } className="next">Next</a>}
      </div>
    );
  }

  render() {
    return (
      <div className='sidebar-area'>
        <div className='heading'>
          <div className="items-list">
            <h1>Items list</h1>
          </div>
        </div>
        <div className='container'>
          {this.renderItems()}
        </div>
        <div className="container pages">
          {this.renderPages()}
        </div>
      </div>
    );
  }
}

export default Sidebar;