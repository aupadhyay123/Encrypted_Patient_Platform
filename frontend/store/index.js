import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import * as reducers from '../reducers';

const rootReducer = combineReducers(reducers);
const logger = createLogger();

export default createStore(rootReducer, applyMiddleware(logger));