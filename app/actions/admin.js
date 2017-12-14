import { apiFetch } from 'utilities';

/*--------*/
// Define Action types
//
// All action types are defined as constants. Do not manually pass action
// types as strings in action creators
/*--------*/
export const GET_ADMIN_DATA_LOAD = 'admin/GET_ADMIN_DATA_LOAD';
export const GET_ADMIN_DATA_SUCCESS = 'admin/GET_ADMIN_DATA_SUCCESS';
export const GET_ADMIN_DATA_FAIL = 'admin/GET_ADMIN_DATA_FAIL';

export const PUT_ADMIN_DISCUSSION_LOAD = 'admin/PUT_ADMIN_DISCUSSION_LOAD';
export const PUT_ADMIN_DISCUSSION_SUCCESS = 'admin/PUT_ADMIN_DISCUSSION_SUCCESS';
export const PUT_ADMIN_DISCUSSION_FAIL = 'admin/PUT_ADMIN_DISCUSSION_FAIL';

export const POST_ADMIN_DISCUSSION_LABEL_LOAD = 'admin/POST_ADMIN_DISCUSSION_LABEL_LOAD';
export const POST_ADMIN_DISCUSSION_LABEL_SUCCESS = 'admin/POST_ADMIN_DISCUSSION_LABEL_SUCCESS';
export const POST_ADMIN_DISCUSSION_LABEL_FAIL = 'admin/POST_ADMIN_DISCUSSION_LABEL_FAIL';

export const DELETE_ADMIN_DISCUSSION_LABEL_LOAD = 'admin/DELETE_ADMIN_DISCUSSION_LABEL_LOAD';
export const DELETE_ADMIN_DISCUSSION_LABEL_SUCCESS = 'admin/DELETE_ADMIN_DISCUSSION_LABEL_SUCCESS';
export const DELETE_ADMIN_DISCUSSION_LABEL_FAIL = 'admin/DELETE_ADMIN_DISCUSSION_LABEL_FAIL';
/*--------*/
// Define Action creators
//
// All calls to dispatch() call one of these functions. Do not manually create
// action objects (e.g. {type:example, payload:data} ) within dispatch()
// function calls
/*--------*/
export function getAdminData() {
	return (dispatch) => {
		dispatch({ type: GET_ADMIN_DATA_LOAD });
		return apiFetch('/admin')
		.then((result) => {
			dispatch({ type: GET_ADMIN_DATA_SUCCESS, result });
		})
		.catch((error) => {
			dispatch({ type: GET_ADMIN_DATA_FAIL, error });
		});
	};
}

export function putAdminDiscussion({ parentId, discussionId, flagged, endorsed }) {
	return (dispatch) => {
		dispatch({
			type: PUT_ADMIN_DISCUSSION_LOAD,
			loadingId: discussionId
		});
		return apiFetch('/admin/discussions', {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				parentId,
				discussionId,
				flagged,
				endorsed,
			})
		})
		.then((result) => {
			dispatch({ type: PUT_ADMIN_DISCUSSION_SUCCESS, result });
		})
		.catch((error) => {
			dispatch({ type: PUT_ADMIN_DISCUSSION_FAIL, error });
		});
	};
}

export function postAdminDiscussionLabel({ discussionId, labelId }) {
	return (dispatch) => {
		dispatch({
			type: POST_ADMIN_DISCUSSION_LABEL_LOAD,
		});
		return apiFetch('/admin/discussionLabels', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				discussionId,
				labelId,
			})
		})
		.then((result) => {
			dispatch({ type: POST_ADMIN_DISCUSSION_LABEL_SUCCESS, result });
		})
		.catch((error) => {
			dispatch({ type: POST_ADMIN_DISCUSSION_LABEL_FAIL, error });
		});
	};
}

export function deleteAdminDiscussionLabel({ discussionId, labelId }) {
	return (dispatch) => {
		dispatch({
			type: DELETE_ADMIN_DISCUSSION_LABEL_LOAD,
		});
		return apiFetch('/admin/discussionLabels', {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				discussionId,
				labelId,
			})
		})
		.then((result) => {
			dispatch({ type: DELETE_ADMIN_DISCUSSION_LABEL_SUCCESS, result });
		})
		.catch((error) => {
			dispatch({ type: DELETE_ADMIN_DISCUSSION_LABEL_FAIL, error });
		});
	};
}
