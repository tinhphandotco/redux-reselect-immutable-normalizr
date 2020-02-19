import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react' 
import { BrowserRouter } from 'react-router-dom';
import configStore from 'redux/store';
import { BASE_PATH } from 'config/constants';

import Root from 'pages/Root';
import * as serviceWorker from './serviceWorker';

import './index.scss';

const { store, persistor } = configStore();

export const _store = store;

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={'loading'} persistor={persistor}>
      <BrowserRouter basename={BASE_PATH}>
        <Root />
      </BrowserRouter>
    </PersistGate>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
