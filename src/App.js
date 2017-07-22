/* @flow */
import React, { Component } from 'react';

/** Material UI */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {CoinDisplay} from './components/CoinDisplay';

import * as _ from 'lodash';

import * as coincap from './utils/coincap';
import {getUberObject} from './utils/db';

import styled from 'styled-components';

export const App = styled.div`
  text-align: center;
`;

export const AppHeader = styled.h2`
	background-color: #222;
  line-height: 55px;
  color: white;
	margin: 0;
`;

type AppState = {
	blacklist: string[],
	coinList: any[],
	limit: number,
	orderBy: string[],
	orders: string[],
	topLimit: number,
	whitelist: string[]
}

type AppProps = {}

const initialState: AppState = {
	coinList: [],
	topLimit: 100,
	limit: 10,
	orderBy: ['mktcap'],
	orders: ['desc'],
	blacklist: ['XRP', 'ETC', 'STRAT', 'BTS', 'USDT', 'ANS'],
	whitelist: ['CVC', 'GNO', 'GNT', 'SC', 'UBQ', 'DCR']
}

class AppImpl extends Component {
	state: AppState;

	constructor(props: AppProps) {
		super(props);
		this.state = initialState;
	}

	getFinalCoinList(fullList: any) {
		// TODO: normalize data, some things are string some are not...
		const { whitelist, blacklist, limit, topLimit, orderBy, orders } = this.state;
		const topCoinList = _.slice(fullList, 0, topLimit);
		const whiteCoinList = _.filter(topCoinList, (o) => _.includes(whitelist, o.short));
		let filteredCoinList = _.filter(topCoinList, (o) => !_.includes(blacklist, o.short));
		console.debug('before: ', filteredCoinList);
		filteredCoinList = _.slice(filteredCoinList, 0, limit);
		filteredCoinList = _.union(filteredCoinList, whiteCoinList);
		filteredCoinList = _.orderBy(filteredCoinList, orderBy, orders);
		const coinList = _.map(filteredCoinList, (coinObj) => {
			return getUberObject(coinObj);
		});
		console.debug('after: ', coinList);
		return coinList;
	}

	componentDidMount() {
		coincap.getFront()
			.then((data) => {
				this.setState({coinList: this.getFinalCoinList(data)});
			});
	}

  render() {
    console.debug('render coinList', this.state.coinList);
    return (
			<MuiThemeProvider>
				<App>
					<AppHeader>Aegeus</AppHeader>
					<div className="App-body">
						<CoinDisplay coinList={this.state.coinList}/>
					</div>
				</App>
			</MuiThemeProvider>
    );
  }
}

export default AppImpl;
