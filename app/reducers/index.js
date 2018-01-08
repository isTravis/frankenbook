import { combineReducers } from 'redux';
import admin from './admin';
import discussions from './discussions';
import login from './login';
import lenses from './lenses';
import passwordReset from './passwordReset';
import signup from './signup';
import user from './user';
import userCreate from './userCreate';

export default combineReducers({
	admin,
	discussions,
	lenses,
	login,
	passwordReset,
	signup,
	user,
	userCreate,
});
