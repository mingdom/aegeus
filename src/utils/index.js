export function jsonGet(url) {
	const fetchParams = {
		method: 'GET',
		mode: 'cors',
	}
	return fetch(url, fetchParams);
}
