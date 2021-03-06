/* @flow */
import React, { Component } from 'react';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Library imports
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import * as _ from 'lodash';
import styled from 'styled-components';

// Project imports
import { CoinDisplay } from './components/CoinDisplay';
import * as CoinListActions from './redux/coinlist';

import { CoinRefreshButton } from './components/CoinRefreshButton';
import { getUberObject } from './utils/db';
import type { CoinList, ICoinListActions } from './redux/coinlist';

injectTapEventPlugin();

export const App = styled.div`
  text-align: center;
`;

export const AppHeader = styled.h2`
	background-color: #222;
  line-height: 55px;
  color: white;
	margin: 0;
`;

function formatCoinList(coinList: CoinList) {
	// TODO: normalize data, some things are string some are not...
	const { whitelist, blacklist, limit, orderBy, orders } = coinList;
	const whiteCoinList = _.filter(coinList.data, (o) => _.includes(whitelist, o.short));
	let filteredCoinList = _.filter(coinList.data, (o) => !_.includes(blacklist, o.short));
	filteredCoinList = _.slice(filteredCoinList, 0, limit);
	filteredCoinList = _.union(filteredCoinList, whiteCoinList);
	filteredCoinList = _.orderBy(filteredCoinList, orderBy, orders);
	return _.map(filteredCoinList, (coinObj) => {
		return getUberObject(coinObj);
	});
}


class AppContainer extends Component {
	props: {
		coinList: CoinList,
		coinListActions: ICoinListActions
	};

  render() {
		const { coinList, coinListActions } = this.props;

		return (
			<MuiThemeProvider>
				<App>
					<AppHeader>Aegeus</AppHeader>
					<div>
						<CoinRefreshButton onClick={() => coinListActions.fetchCoinList()} />

						<CoinDisplay coinList={formatCoinList(coinList)}/>
					</div>
				</App>
			</MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
	return {
		coinList: state.coinList
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		coinListActions: bindActionCreators(CoinListActions, dispatch)
	}
}

export default connect(
	mapStateToProps, mapDispatchToProps
)(AppContainer);
