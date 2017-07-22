/* @flow */
import type {
  Dispatch as ReduxDispatch,
} from 'redux';
import * as _ from 'lodash';

import type { CoinList } from '../Types';
import * as utils from '../utils';

/** Actions **/
const LOAD = 'coinlist/load';
const LOAD_SUCCESS = 'coinlist/loadsuccess';
const LOAD_FAILURE = 'coinlist/loadfailure';

type CoinListAction = {
	type: string,
	error: string,
	data: Array<any>,
}

/** Reducer */
const coinTopLimit = 100;
const initialState: CoinList = {
	data: [],
	limit: 10,
	orderBy: ['mktcap'],
	orders: ['desc'],
	blacklist: ['XRP', 'ETC', 'STRAT', 'BTS', 'USDT', 'ANS'],
	whitelist: ['CVC', 'GNO', 'GNT', 'SC', 'UBQ', 'DCR']
}

export default function reducer(
		state: CoinList = initialState, action: any = {}) {
	switch (action.type) {
		case LOAD:
			return {
				...state,
				loading: true,
			};
		case LOAD_SUCCESS:
			return {
				...state,
				loading: false,
				data: _.slice(action.data, 0, coinTopLimit)
			};
		case LOAD_FAILURE:
			console.error(`Failed to load coin list due to: ${action.error}`)
			return {
				...state,
				loading: false,
				data: []
			}
		default:
			return state;
	}
}

/** Action Creators **/
function loadCoinList() {
	return {
		type: LOAD
	};
}

const loadCoinListFailure = (error): CoinListAction => ({
	type: LOAD_FAILURE,
	error,
	data: []
});

const loadCoinListSuccess = (data: any[]): CoinListAction => ({
	type: LOAD_SUCCESS,
	data,
	error: ''
});

export function fetchCoinList() {
	return async (dispatch: ReduxDispatch) => {
		dispatch(loadCoinList());

		try {
			const coincapFrontApi = 'https://coincap.io/front';
			const data = await utils.jsonGet(coincapFrontApi);
			dispatch(loadCoinListSuccess(data))

		} catch(err) {
			dispatch(loadCoinListFailure(err.message));
		}
	}
}
