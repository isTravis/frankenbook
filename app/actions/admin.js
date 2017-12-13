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
