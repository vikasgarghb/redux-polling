import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import { allSaga } from 'src/sagas';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware({
    context: {
      apiClient: axios.create({
        baseURL: 'http://localhost:3000',
      }),
    },
  });

  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(allSaga);

  return { store };
};

export { configureStore };
