import { combineReducers } from 'redux';
import content from './content';
import discussions from './discussions';
import login from './login';
import lenses from './lenses';
import signup from './signup';
import user from './user';
import userCreate from './userCreate';

export default combineReducers({
	content,
	discussions,
	lenses,
	login,
	signup,
	user,
	userCreate,
});
