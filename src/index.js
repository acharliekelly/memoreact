import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import memoryApp from './reducers';
import './css/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App';

const store = createStore(memoryApp);

const appJsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(appJsx, document.getElementById('root'));
