/* ---------- */
// Load Actions
/* ---------- */
import {
	GET_ADMIN_DATA_LOAD,
	GET_ADMIN_DATA_SUCCESS,
	GET_ADMIN_DATA_FAIL,

	PUT_ADMIN_DISCUSSION_LOAD,
	PUT_ADMIN_DISCUSSION_SUCCESS,
	PUT_ADMIN_DISCUSSION_FAIL,

	POST_ADMIN_DISCUSSION_LABEL_LOAD,
	POST_ADMIN_DISCUSSION_LABEL_SUCCESS,
	POST_ADMIN_DISCUSSION_LABEL_FAIL,

	DELETE_ADMIN_DISCUSSION_LABEL_LOAD,
	DELETE_ADMIN_DISCUSSION_LABEL_SUCCESS,
	DELETE_ADMIN_DISCUSSION_LABEL_FAIL,
} from 'actions/admin';

/* ------------------- */
// Define Default State
/* ------------------- */
const defaultState = {
	data: undefined,
	isLoading: false,
	putDiscussionIsLoading: '',
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
	case PUT_ADMIN_DISCUSSION_LOAD:
		return {
			...state,
			putDiscussionIsLoading: action.loadingId,
			error: false
		};
	case PUT_ADMIN_DISCUSSION_SUCCESS:
		return {
			data: {
				...state.data,
				discussions: state.data.discussions.map((discussion)=> {
					if (discussion.id === action.result.id) {
						return {
							...discussion, 
							...action.result
						};
					}
					return discussion;
				})
			},
			isLoading: false,
			error: undefined,
		};
	case PUT_ADMIN_DISCUSSION_FAIL:
		return {
			...state,
			isLoading: false,
			error: action.error
		};
	case POST_ADMIN_DISCUSSION_LABEL_LOAD:
	case POST_ADMIN_DISCUSSION_LABEL_FAIL:
		return state;
	case POST_ADMIN_DISCUSSION_LABEL_SUCCESS:
		return {
			data: {
				...state.data,
				discussions: state.data.discussions.map((discussion)=> {
					if (discussion.id === action.result.discussionId) {
						return {
							...discussion, 
							labels: [
								...discussion.labels,
								action.result.labelData
							]
						};
					}
					return discussion;
				})
			},
			isLoading: false,
			error: undefined,
		};
	case DELETE_ADMIN_DISCUSSION_LABEL_LOAD:
	case DELETE_ADMIN_DISCUSSION_LABEL_FAIL:
		return state;
	case DELETE_ADMIN_DISCUSSION_LABEL_SUCCESS:
		return {
			data: {
				...state.data,
				discussions: state.data.discussions.map((discussion)=> {
					if (discussion.id === action.result.discussionId) {
						return {
							...discussion, 
							labels: discussion.labels.filter((label)=> {
								return label.id !== action.result.labelId;
							})
						};
					}
					return discussion;
				})
			},
			isLoading: false,
			error: undefined,
		};
	default:
		return state;
	}
}
