import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './redux/reducers';
import './css/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App/';

const store = createStore(rootReducer);

const appJsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(appJsx, document.getElementById('root'));
