import React, { Component } from 'react'
import './index.scss';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div className='header-area'>
        Pilot Master-Details App
              (<Link to="/">List items</Link> 
              <Link to="/items/create">Create item</Link>)
      </div>
    )
  }
}

export default Header;