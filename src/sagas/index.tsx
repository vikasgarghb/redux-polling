/* istanbul ignore file */
import { all, call } from 'redux-saga/effects';
import jobSagas from './job';

function* allSaga() {
  yield all([call(jobSagas)]);
}

export { allSaga };
