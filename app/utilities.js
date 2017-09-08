export const apiFetch = function(path, opts) {
	const urlPrefix = 'https://pubpub-api-v4-dev.herokuapp.com';
	// const urlPrefix = 'http://localhost:9876';
	const finalRoute = `${urlPrefix}${path}`;

	return fetch(finalRoute, {
		...opts,
		credentials: 'include',
	})
	.then((response)=> {
		if (!response.ok) {
			return response.json().then((err)=> { throw err; });
		}
		return response.json();
	});
};
