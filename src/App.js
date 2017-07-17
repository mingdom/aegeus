import React, { Component } from 'react';
import './App.css';

/** Material UI */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {CoinDisplay} from './components/CoinDisplay';

const appFriendlyName = "mingdom.io // Aegeus";

function jsonGet(url) {
	const fetchParams = {
		method: 'GET',
		mode: 'cors',
	}
	return fetch(url, fetchParams);
}

function fetchCoincapFront() {
	const coincapFrontApi = 'https://coincap.io/front';
	return jsonGet(coincapFrontApi)
		.then(res => res.json(), err => console.error(err));
}

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			coincapFront: []
		};
	}

	componentDidMount() {
		fetchCoincapFront()
			.then((data) => {
				this.setState({coincapFront: data});
			})
	}

  render() {
    return (
			<MuiThemeProvider>
				<div className="App">
					<div className="App-header">
						<h2>{appFriendlyName}</h2>
					</div>
					<div className="App-body">
						<CoinDisplay frontList={this.state.coincapFront}/>
					</div>
				</div>
			</MuiThemeProvider>
    );
  }
}

export default App;
