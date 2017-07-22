/* @flow */
export async function jsonGet(url: string) {
	const fetchParams = {
		method: 'GET',
		mode: 'cors',
	}

	const res = await fetch(url, fetchParams);
	return res.json();
}
