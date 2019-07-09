import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import gameApp from './reducers';
import './css/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

const store = createStore(gameApp);

const appJsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(appJsx, document.getElementById('root'));
