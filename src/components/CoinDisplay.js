import React from 'react';
import * as _ from 'lodash';

import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const coincapFrontDataMap = {
	// position24: 'Market Position',
	short: 'Ticker',
	// long: 'Name',
	mktcap: 'Market Cap',
	usdVolume: 'Volume',
	price: 'Price',
	// cap24hrChange: '% Change (24h)'
}

function formatTableData(value) {
	const intValue = _.parseInt(value);
	if (intValue) {
		if (value > 10 * 1000) {
			return `$${intValue.toLocaleString()}`;
		}
		return _.round(value, 2);
	}

	return value;
}

function CoinTableBody({list}) {
	const rows = _.map(list, (listItem) => {
		const columns = _.map(coincapFrontDataMap, (value, key) => {
			const displayData = formatTableData(listItem[key]);
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

export function CoinDisplay(
		{frontList, limit=30, orderBy=['mktcap'], order=['desc']}) {
	const renderedList = _.orderBy(
		_.slice(frontList, 0, limit), orderBy, order);
	const headerColumns = _.map(coincapFrontDataMap, (value, key) => {
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
			{CoinTableBody({list: renderedList})}
		</Table>
	);
}
