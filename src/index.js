import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App';

const appJsx = (
  <App />
);

ReactDOM.render(appJsx, document.getElementById('root'));
