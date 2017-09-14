import { combineReducers } from 'redux';
import app from './app';
import login from './login';
import lenses from './lenses';
import user from './user';

export default combineReducers({
	app,
	lenses,
	login,
	user,
});
