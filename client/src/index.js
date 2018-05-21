import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import MyApp from './App.js';
import WebFont from 'webfontloader';
import {BrowserRouter as Router } from 'react-router-dom';


import registerServiceWorker from './registerServiceWorker';


WebFont.load({
    google: {
      families: ['Gugi','Titillium Web:300,400,700', 'sans-serif']
    }
  });

ReactDOM.render(
    <Router>
    <MyApp />
    </Router> , document.getElementById('root'));
registerServiceWorker();
