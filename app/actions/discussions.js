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
