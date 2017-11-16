/* ---------- */
// Load Actions
/* ---------- */
import {
	GET_CONTENT_DATA_LOAD,
	GET_CONTENT_DATA_SUCCESS,
	GET_CONTENT_DATA_FAIL,

	PUT_CONTENT_DATA_LOAD,
	PUT_CONTENT_DATA_SUCCESS,
	PUT_CONTENT_DATA_FAIL,
} from 'actions/content';

/* ------------------- */
// Define Default State
/* ------------------- */
const defaultState = {
	data: undefined,
	isLoading: false,
	error: undefined,
	putIsLoading: false,
	putError: undefined,
};

/* ----------------------------------------- */
// Bind actions to specific reducing functions
/* ----------------------------------------- */
export default function reducer(state = defaultState, action) {
	switch (action.type) {
	case GET_CONTENT_DATA_LOAD:
		return {
			data: undefined,
			isLoading: true,
			error: undefined
		};
	case GET_CONTENT_DATA_SUCCESS:
		return {
			data: action.result,
			isLoading: false,
			error: undefined,
		};
	case GET_CONTENT_DATA_FAIL:
		return {
			data: undefined,
			isLoading: false,
			error: action.error,
		};
	case PUT_CONTENT_DATA_LOAD:
		return {
			putIsLoading: true,
			putError: undefined
		};
	case PUT_CONTENT_DATA_SUCCESS:
		return {
			data: {
				...state.data,
				json: action.result,
			},
			putIsLoading: false,
			putError: undefined,
		};
	case PUT_CONTENT_DATA_FAIL:
		return {
			putIsLoading: false,
			// putError: action.error,
			putError: 'Error Saving',
		};
	default:
		return state;
	}
}
