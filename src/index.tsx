/* istanbul ignore file */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import ReduxPollingApp from './containers/app';

const { store } = configureStore();
const rootElement = document.getElementById('redux-saga-polling-root');

ReactDOM.render(
  <Provider store={store}>
    <ReduxPollingApp />
  </Provider>,
  rootElement,
);
