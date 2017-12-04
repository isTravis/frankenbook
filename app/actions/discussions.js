import { apiFetch } from 'utilities';

/*--------*/
// Define Action types
//
// All action types are defined as constants. Do not manually pass action
// types as strings in action creators
/*--------*/
export const GET_DISCUSSIONS_DATA_LOAD = 'discussions/GET_DISCUSSIONS_DATA_LOAD';
export const GET_DISCUSSIONS_DATA_SUCCESS = 'discussions/GET_DISCUSSIONS_DATA_SUCCESS';
export const GET_DISCUSSIONS_DATA_FAIL = 'discussions/GET_DISCUSSIONS_DATA_FAIL';

export const POST_DISCUSSION_LOAD = 'discussions/POST_DISCUSSION_LOAD';
export const POST_DISCUSSION_SUCCESS = 'discussions/POST_DISCUSSION_SUCCESS';
export const POST_DISCUSSION_FAIL = 'discussions/POST_DISCUSSION_FAIL';

export const PUT_DISCUSSION_LOAD = 'discussions/PUT_DISCUSSION_LOAD';
export const PUT_DISCUSSION_SUCCESS = 'discussions/PUT_DISCUSSION_SUCCESS';
export const PUT_DISCUSSION_FAIL = 'discussions/PUT_DISCUSSION_FAIL';

/*--------*/
// Define Action creators
//
// All calls to dispatch() call one of these functions. Do not manually create
// action objects (e.g. {type:example, payload:data} ) within dispatch()
// function calls
/*--------*/
export function getDiscussionsData(slugs) {
	return (dispatch) => {
		dispatch({ type: GET_DISCUSSIONS_DATA_LOAD });
		return apiFetch(`/discussions/${slugs}`)
		.then((result) => {
			dispatch({ type: GET_DISCUSSIONS_DATA_SUCCESS, result });
		})
		.catch((error) => {
			dispatch({ type: GET_DISCUSSIONS_DATA_FAIL, error });
		});
	};
}

export function postDiscussion(discussionObject) {
	return (dispatch) => {
		dispatch({
			type: POST_DISCUSSION_LOAD,
			loadingId: discussionObject.parentId ? `${discussionObject.anchor}-${discussionObject.parentId}-reply` : `${discussionObject.anchor}-new`
		});
		return apiFetch('/discussions', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(discussionObject)
		})
		.then((result) => {
			dispatch({ type: POST_DISCUSSION_SUCCESS, result });
		})
		.catch((error) => {
			dispatch({ type: POST_DISCUSSION_FAIL, error });
		});
	};
}

export function putDiscussion(discussionObject) {
	return (dispatch) => {
		dispatch({
			type: PUT_DISCUSSION_LOAD,
			loadingId: discussionObject.id
		});
		return apiFetch('/discussions', {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(discussionObject)
		})
		.then((result) => {
			dispatch({ type: PUT_DISCUSSION_SUCCESS, result });
		})
		.catch((error) => {
			dispatch({ type: PUT_DISCUSSION_FAIL, error });
		});
	};
}
