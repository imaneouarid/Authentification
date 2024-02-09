
import './App.css'
// App.jsx
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Register from '../src/pages/register'
import { BrowserRouter as Router } from 'react-router-dom';




const App = () => {
  return (
    <Provider store={store}>
      <Router>  
        <Register />
        </Router>  

    </Provider>
  );
};


export default App

