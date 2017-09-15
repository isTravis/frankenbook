/* ---------- */
// Load Actions
/* ---------- */
import {
	POST_LOGIN_LOAD,
	POST_LOGIN_SUCCESS,
	POST_LOGIN_FAIL,

	GET_LOGOUT_LOAD,
	GET_LOGOUT_SUCCESS,
	GET_LOGOUT_FAIL,
} from 'actions/login';

/* ------------------- */
// Define Default State
/* ------------------- */
const defaultState = {
	data: undefined,
	loading: false,
	error: undefined,
};

/* ----------------------------------------- */
// Bind actions to specific reducing functions
/* ----------------------------------------- */
export default function reducer(state = defaultState, action) {
	switch (action.type) {
	case POST_LOGIN_LOAD:
		return {
			data: undefined,
			loading: true,
			error: undefined,
		};
	case POST_LOGIN_SUCCESS:
		return {
			data: action.result,
			loading: false,
			error: undefined,
		};
	case POST_LOGIN_FAIL:
		return {
			data: undefined,
			loading: false,
			error: 'Invalid Email or Password'
		};
	case GET_LOGOUT_LOAD:
	case GET_LOGOUT_FAIL:
		return state;
	case GET_LOGOUT_SUCCESS:
		return defaultState;
	default:
		return state;
	}
}
