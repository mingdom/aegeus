import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppContainer from './AppContainer';
import registerServiceWorker from './registerServiceWorker';

// Redux
import { Provider } from 'react-redux';
import createStore from './redux/create';
import * as CoinListActions from './redux/coinlist';

const store = createStore;
store.dispatch(CoinListActions.fetchCoinList());

ReactDOM.render(
	<Provider store={store}>
		<AppContainer />
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
