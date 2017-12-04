export const apiUrlPrefix = function() {
	let urlPrefix = 'https://frankenbook-api.herokuapp.com';
	if (window.location.origin.indexOf('localhost:') > -1) {
		urlPrefix = 'http://localhost:9876';
	}
	return urlPrefix;
};

export const apiFetch = function(path, opts) {
	const urlPrefix = apiUrlPrefix();
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

export const defaultLenses = ['community', 'healthmed', 'technology', 'motivments', 'science'];

export function generateHash(length) {
	const tokenLength = length || 32;
	const possible = 'abcdefghijklmnopqrstuvwxyz';

	let hash = '';
	for (let index = 0; index < tokenLength; index++) {
		hash += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return hash;
}

export function s3Upload(file, progressEvent, finishEvent, index) {
	function beginUpload() {
		const folderName = window.location.hostname !== 'localhost' && window.location.hostname !== 'dev.pubpub.org'
			? generateHash(8)
			: '_testing';

		const extension = file.name !== undefined ? file.name.substr((~-file.name.lastIndexOf('.') >>> 0) + 2) : 'jpg';

		// const filename = folderName + '/' + new Date().getTime() + '.' + extension;
		const filename = folderName + '/' + (Math.floor(Math.random() * 8)) + new Date().getTime() + '.' + extension;
		const fileType = file.type !== undefined ? file.type : 'image/jpeg';
		const formData = new FormData();

		formData.append('key', filename);
		formData.append('AWSAccessKeyId', 'AKIAJQ5MNLCTIMY2ZF7Q');
		formData.append('acl', 'public-read');
		formData.append('policy', JSON.parse(this.responseText).policy);
		formData.append('signature', JSON.parse(this.responseText).signature);
		formData.append('Content-Type', fileType);
		formData.append('success_action_status', '200');
		formData.append('file', file);
		const sendFile = new XMLHttpRequest();
		sendFile.upload.addEventListener('progress', (evt)=>{
			progressEvent(evt, index);
		}, false);
		sendFile.upload.addEventListener('load', (evt)=>{
			finishEvent(evt, index, file.type, filename, file.name);
		}, false);
		sendFile.open('POST', 'https://s3-external-1.amazonaws.com/assets.pubpub.org', true);
		sendFile.send(formData);
	}

	const getPolicy = new XMLHttpRequest();
	const urlPrefix = apiUrlPrefix();
	getPolicy.addEventListener('load', beginUpload);
	getPolicy.open('GET', `${urlPrefix}/uploadPolicy?contentType=${file.type}`);
	getPolicy.send();
}

export const getResizedUrl = function(url, type, dimensions) {
	/* jake.pubpub.org is our original resizing service */
	/* hosted on Heroku with .gif support. More expensive, but works. */
	/* Unsure of how well it scales since its caching is memory-based */
	/* jakejr.pubpub.org is an AWS cloudformation distribution. */
	/* http://docs.aws.amazon.com/solutions/latest/serverless-image-handler/welcome.html */
	/* It does not have .gif support, but should scale much better */
	/* and saves its cache on cloudfront */
	if (!url || url.indexOf('https://assets.pubpub.org/') === -1) { return url; }
	const extension = url.split('.').pop().toLowerCase();
	const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];
	if (validExtensions.indexOf(extension) === -1) { return 'url'; }

	const prefix = type ? `${type}/` : '';
	if (extension === 'gif') {
		return `https://jake.pubpub.org/unsafe/${prefix}${dimensions}/${url}`;
	}
	const filepath = url.replace('https://assets.pubpub.org/', '');
	return `https://jakejr.pubpub.org/${prefix}${dimensions}/${filepath}`;
};
