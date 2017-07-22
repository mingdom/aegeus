/* @flow */
import * as utils from '../utils';

export function getFront() {
	const coincapFrontApi = 'https://coincap.io/front';
	return utils.jsonGet(coincapFrontApi)
		.then(res => res.json(), err => console.error(err));
}
