import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import { allSaga } from '../sagas';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware({
    context: {
      apiClient: axios.create({
        baseURL: 'http://localhost:3000',
      }),
    },
  });

  const middleware = [sagaMiddleware];

  const store = createStore(rootReducer, applyMiddleware(...middleware));

  sagaMiddleware.run(allSaga);

  return { store };
};

export { configureStore };
