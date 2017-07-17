import React from 'react';
import * as _ from 'lodash';

import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const coinColumns = {
	// position24: '#',
	short: 'Coin',
	// long: 'Name',
	mktcap: 'Market Cap',
	usdVolume: 'Volume',
	price: 'Price',
	cap24hrChange: '24h %',
	github: 'GitHub',
	twitter: 'Twitter',
	reddit: 'Reddit',
}

const SOCIAL_URLS = {
	'reddit': 'https://www.reddit.com/r',
	'twitter': 'https://www.twitter.com',
	'github': 'https://www.github.com'
}

function renderSocialLink(site, account) {
	if (!account) {
		return '';
	}

	const siteUrlPrefix = SOCIAL_URLS[site];
	if (!siteUrlPrefix) {
		console.warn(`Invalid site: ${site}`, site);
		return '';
	}

	return (
		<a href={`${siteUrlPrefix}/${account}`} target='_blank'>
			{account}
		</a>
	);
}


const GitHub = (repo) => {
	return renderSocialLink('github', repo)
}

const Twitter = (account) => {
	return renderSocialLink('twitter', account)
}

const Reddit = (account) => {
	return renderSocialLink('reddit', account);
}

function formatTableData(key, value, obj) {
	if (key === 'short') {
		return `${obj.long} (${obj.short})`;
	}

	const currencyKeys = ['price', 'mktcap', 'usdVolume'];
	if (_.includes(currencyKeys, key)) {
		const intValue = _.parseInt(value);
		if (intValue) {
			if (value > 10 * 1000) {
				return `$${intValue.toLocaleString()}`;
			}
			return _.round(intValue, 2);
		}
	}

	if (key === 'github') {
		return GitHub(value);
	}

	if (key === 'twitter') {
		return Twitter(value);
	}

	if (key === 'reddit') {
		return Reddit(value);
	}

	return value;
}

function CoinTableBody({list}) {
	const rows = _.map(list, (listItem) => {
		const columns = _.map(coinColumns, (value, key) => {
			const displayData = formatTableData(key, listItem[key], listItem);
			return (
				<TableRowColumn key={`cd_column_${key}`}>
					{displayData}
				</TableRowColumn>
				);
			}
		);
		return (
			<TableRow
				key={`cd_row_${listItem.short}`}
				hoverable={true}
			>
				{columns}
			</TableRow>
		);
	});

	return (
		<TableBody
			displayRowCheckbox={false}
		>
			{rows}
		</TableBody>
	);
}

export function CoinDisplay({coinList }) {
	const headerColumns = _.map(coinColumns, (value, key) => {
		return (
			<TableRowColumn
				key={`cd_header_${key}`}
				data-sort-key={key}
			>
				{value}
			</TableRowColumn>
		);
	})
	return (
		<Table
			selectable={false}
		>
			<TableHeader
				displaySelectAll={false}
				adjustForCheckbox={false}
			>
				<TableRow
					striped={true}
				>
					{headerColumns}
				</TableRow>
			</TableHeader>
			{CoinTableBody({list: coinList})}
		</Table>
	);
}
