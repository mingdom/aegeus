import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Redux
import { Provider } from 'react-redux';
import createStore from './redux/create';
import * as CoinListActions from './redux/coinlist';

const store = createStore;
store.dispatch(CoinListActions.fetchCoinList());

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
