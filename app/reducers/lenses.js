/* ---------- */
// Load Actions
/* ---------- */
import {
	GET_LENSES_DATA_LOAD,
	GET_LENSES_DATA_SUCCESS,
	GET_LENSES_DATA_FAIL,
} from 'actions/lenses';

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
	case GET_LENSES_DATA_LOAD:
		return {
			data: undefined,
			isLoading: true,
			error: undefined
		};
	case GET_LENSES_DATA_SUCCESS:
		return {
			data: action.result.labelsData,
			isLoading: false,
			error: undefined,
		};
	case GET_LENSES_DATA_FAIL:
		return {
			data: undefined,
			isLoading: false,
			error: action.error,
		};
	default:
		return state;
	}
}
