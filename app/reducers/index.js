import { combineReducers } from 'redux';
import discussions from './discussions';
import login from './login';
import lenses from './lenses';
import signup from './signup';
import user from './user';

export default combineReducers({
	discussions,
	lenses,
	login,
	signup,
	user,
});
