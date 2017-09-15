/* ---------- */
// Load Actions
/* ---------- */
import {
	GET_DISCUSSIONS_DATA_LOAD,
	GET_DISCUSSIONS_DATA_SUCCESS,
	GET_DISCUSSIONS_DATA_FAIL,

	POST_DISCUSSION_LOAD,
	POST_DISCUSSION_SUCCESS,
	POST_DISCUSSION_FAIL,
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
	case POST_DISCUSSION_LOAD:
		return {
			data: state.data,
			isLoading: true,
			error: undefined
		};
	case POST_DISCUSSION_SUCCESS:
		return {
			data: state.data.map((discussion)=> {
				if (discussion.id === action.result.parentId) {
					return {
						...discussion,
						replies: [...discussion.replies, action.result]
					};
				}
				return discussion;
			}),
			isLoading: false,
			error: undefined,
		};
	case POST_DISCUSSION_FAIL:
		return {
			data: state.data,
			isLoading: false,
			error: action.error,
		};
	default:
		return state;
	}
}
