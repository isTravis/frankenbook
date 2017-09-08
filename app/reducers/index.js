import { combineReducers } from 'redux';
import app from './app';
import login from './login';
import user from './user';

export default combineReducers({
	app,
	login,
	user,
});
