import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './../header';
import Home from './../home';
import ItemForm from './../form';

class App extends Component {
  renderRouters = () => (
    <div>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/items' component={Home}/>
        <Route exact path='/items/create' component={ItemForm}/>
        <Route exact path='/items/:id' component={Home}/>
        <Route exact path='/items/:id/edit' component={ItemForm}/>
      </Switch>
    </div>
  );
  render() {
    return (
        <div className="App">
            <Header/>
            {this.renderRouters()}
        </div>
    );
  }
}

export default App;
