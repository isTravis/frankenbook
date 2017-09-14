import { combineReducers } from 'redux';
import app from './app';
import discussions from './discussions';
import login from './login';
import lenses from './lenses';
import user from './user';

export default combineReducers({
	app,
	discussions,
	lenses,
	login,
	user,
});
