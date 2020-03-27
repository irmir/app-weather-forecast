import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Header } from './components';
import { Body } from './components';

import { store } from './store'
import { Provider } from 'react-redux'


function App() {
  return (
    <Provider store={store}>
        <Header />
        <Body />
    </Provider>
  )
}

export default App;
