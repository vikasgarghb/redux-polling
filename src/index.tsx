/* istanbul ignore file */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import ReduxPollingApp from './containers/app';

const rootElement = document.getElementById('redux-saga-polling-root');

ReactDOM.render(
  <Provider store={store}>
    <ReduxPollingApp />
  </Provider>,
  rootElement,
);
