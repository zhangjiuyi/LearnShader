import React, { Component } from 'react';
import './App.css'
import GL from './gl'

class App extends Component {

  componentDidMount() {
    new GL(document.querySelector('#container'))
  }


  render() {
    return (
      <div id='container'>
      </div>
    );
  }
}

export default App;