/* ---------- */
// Load Actions
/* ---------- */
import {
	GET_ADMIN_DATA_LOAD,
	GET_ADMIN_DATA_SUCCESS,
	GET_ADMIN_DATA_FAIL,
} from 'actions/admin';

/* ------------------- */
// Define Default State
/* ------------------- */
const defaultState = {
	data: undefined,
	isLoading: false,
	error: undefined,
};

/* ----------------------------------------- */
// Bind actions to specific reducing functions
/* ----------------------------------------- */
export default function reducer(state = defaultState, action) {
	switch (action.type) {
	case GET_ADMIN_DATA_LOAD:
		return {
			...state,
			isLoading: true,
			error: false
		};
	case GET_ADMIN_DATA_SUCCESS:
		return {
			data: action.result,
			isLoading: false,
			error: undefined,
		};
	case GET_ADMIN_DATA_FAIL:
		return {
			...state,
			isLoading: false,
			error: action.error
		};
	default:
		return state;
	}
}
