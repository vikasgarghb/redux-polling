/* istanbul ignore file */
import { combineReducers } from 'redux';
import jobReducer from './job';

const rootReducer = combineReducers({ jobReducer });

export default rootReducer;
