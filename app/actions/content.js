import { apiFetch } from 'utilities';

/*--------*/
// Define Action types
//
// All action types are defined as constants. Do not manually pass action
// types as strings in action creators
/*--------*/
export const GET_CONTENT_DATA_LOAD = 'content/GET_CONTENT_DATA_LOAD';
export const GET_CONTENT_DATA_SUCCESS = 'content/GET_CONTENT_DATA_SUCCESS';
export const GET_CONTENT_DATA_FAIL = 'content/GET_CONTENT_DATA_FAIL';

export const PUT_CONTENT_DATA_LOAD = 'content/PUT_CONTENT_DATA_LOAD';
export const PUT_CONTENT_DATA_SUCCESS = 'content/PUT_CONTENT_DATA_SUCCESS';
export const PUT_CONTENT_DATA_FAIL = 'content/PUT_CONTENT_DATA_FAIL';
/*--------*/
// Define Action creators
//
// All calls to dispatch() call one of these functions. Do not manually create
// action objects (e.g. {type:example, payload:data} ) within dispatch()
// function calls
/*--------*/
export function getContentData() {
	return (dispatch) => {
		dispatch({ type: GET_CONTENT_DATA_LOAD });
		return apiFetch(`/content`)
		.then((result) => {
			dispatch({ type: GET_CONTENT_DATA_SUCCESS, result });
		})
		.catch((error) => {
			dispatch({ type: GET_CONTENT_DATA_FAIL, error });
		});
	};
}

export function putContentData(id, json) {
	return (dispatch) => {
		dispatch({ type: PUT_CONTENT_DATA_LOAD });
		return apiFetch('/content', {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id,
				json
			})
		})
		.then((result) => {
			dispatch({ type: PUT_CONTENT_DATA_SUCCESS, result });
		})
		.catch((error) => {
			dispatch({ type: PUT_CONTENT_DATA_FAIL, error });
		});
	};
}
