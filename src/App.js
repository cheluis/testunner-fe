import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import TestList from './containers/test_list';
import TestFormContainer from './containers/test_form_container';
import TestForm from './components/test_form';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
       <TestForm />
        <TestList />
      </div>
    );
  }
}

export default App;
