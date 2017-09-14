/* ---------- */
// Load Actions
/* ---------- */
import {
	GET_DISCUSSIONS_DATA_LOAD,
	GET_DISCUSSIONS_DATA_SUCCESS,
	GET_DISCUSSIONS_DATA_FAIL,
} from 'actions/discussions';

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
	case GET_DISCUSSIONS_DATA_LOAD:
		return {
			data: undefined,
			isLoading: true,
			error: undefined
		};
	case GET_DISCUSSIONS_DATA_SUCCESS:
		return {
			data: action.result,
			isLoading: false,
			error: undefined,
		};
	case GET_DISCUSSIONS_DATA_FAIL:
		return {
			data: undefined,
			isLoading: false,
			error: action.error,
		};
	default:
		return state;
	}
}
