import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import UserModule from './modules/user';

const store = createStore(
	combineReducers({
		user: UserModule,
	}),
	applyMiddleware(logger, thunk)
);

export default store;
