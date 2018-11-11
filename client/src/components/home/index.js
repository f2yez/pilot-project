import React, { Component } from 'react'
import Details from './../details';
import Sidebar from './../sidebar';
import './index.scss';

class Home extends Component {
  render() {
    return (
      <div className='home-area'>
            <Sidebar/>
            <Details/>
      </div>
    )
  }
}

export default Home;