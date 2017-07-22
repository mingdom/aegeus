/* @flow */
import React from 'react';
import * as _ from 'lodash';
import { SocialLinks } from './SocialLinks';
import { CoinCapItem, TableDataKey, CoinList } from '../Types';

import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const coinColumns: CoinCapItem = {
	// position24: '#',
	short: 'Coin',
	// long: 'Name',
	mktcap: 'Market Cap',
	usdVolume: 'Volume',
	price: 'Price',
	cap24hrChange: '24h %',
	social: 'Social'
};

function formatTableData(key: TableDataKey, value, obj) {
	if (key === "short") {
		return `${obj.long} (${obj.short})`;
	}

	const currencyKeys = ["price", "mktcap", "usdVolume"];

	if (_.includes(currencyKeys, key)) {
		const intValue = _.parseInt(value);
		if (intValue) {
			if (value > 10 * 1000) {
				return `$${intValue.toLocaleString()}`;
			}
			return _.round(intValue, 2);
		}
	}

	if (key === "social") {
		return (<SocialLinks data={value}/>);
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

export function CoinDisplay(props: { coinList: CoinList }) {
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
			{CoinTableBody({list: props.coinList})}
		</Table>
	);
}
