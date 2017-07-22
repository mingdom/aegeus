/* @flow */
export function jsonGet(url: string) {
	const fetchParams = {
		method: 'GET',
		mode: 'cors',
	}
	return fetch(url, fetchParams);
}