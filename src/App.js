import React, { Component } from 'react';
import './App.css';

/** Material UI */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {CoinDisplay} from './components/CoinDisplay';

import * as coincap from './utils/coincap';
import * as github from './utils/github';

const appFriendlyName = "mingdom.io // Aegeus";
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
      coincapFront: [],
      github: []
		};
	}

	componentDidMount() {
		coincap.getFront()
			.then((data) => {
				this.setState({coincapFront: data});
			});

		// TODO
		// github.getCoinOrgData()
		// 	.then((data) => console.log('data', data));

		// Promise.all(github.getCoinOrgData())
		// 	.then(values => {
    //     _.each(values, (repoRes) => {
    //       repoRes.json()
    //         .then((data) => console.log(data));
    //     });
		// 	});
	}

  render() {
    console.log('coincap', this.state.coincapFront);
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
