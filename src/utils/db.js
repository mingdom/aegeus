import * as _ from 'lodash';

const DB_OBJECT = [
	{
		"ticker": "BTC",
		"github": "bitcoin/bitcoin",
		"twitter": "bitcoin",
		"reddit": "bitcoin",
	},
	{
		"ticker": "ETH",
		"github": "ethereum/go-ethereum",
		"twitter": "ethereum",
		"reddit": "ethereum",
	},
	{
		"ticker": "LTC",
		"github": "litecoin-project/litecoin",
		"twitter": "litecoin",
		"reddit": "litecoin",
	},
	{
		"ticker": "DASH",
		"github": "dashpay/dash",
		"twitter": "dashpay",
		"reddit": "dashpay",
	},
	{
		"ticker": "XEM",
		"github": "NemProject/nem.core",
		"twitter": "NEMofficial",
		"reddit": "nem",
	},
	{
		"ticker": "MIOTA",
		"github": "iotaledger/wallet",
		"twitter": "iotatoken",
		"reddit": "Iota",
	},
	{
		"ticker": "XMR",
		"github": "monero-project/monero",
		"twitter": "monerocurrency",
		"reddit": "monero",
	},
	{
		"ticker": "EOS",
		"github": "EOSIO/eos",
		"twitter": "eos_io",
		"reddit": "eos",
	},
	{
		"ticker": "ZEC",
		"github": "zcash/zcash",
		"twitter": "zcashco",
		"reddit": "zec",
	},
	{
		"ticker": "GNT",
		"github": "golemfactory/golem",
		"twitter": "golemproject",
		"reddit": "GolemProject",
	},
	{
		"ticker": "CVC",
		"github": null,
		"twitter": "civickey",
		"reddit": "civicplatform",
	},
	{
		"ticker": "SC",
		"github": "NebulousLabs/Sia",
		"twitter": "siatechhq",
		"reddit": "siacoin",
	},
	{
		"ticker": "GNO",
		"github": "ConsenSys/gnosis-contracts",
		"twitter": "gnosisPM",
		"reddit": "gnosisPM",
	},
	{
		"ticker": "STEEM",
		"github": "steemit/steem",
		"twitter": "Steemit",
		"reddit": "steemit",
	},
]

export function getObjectByTicker(ticker) {
	return _.find(DB_OBJECT, (o) => o.ticker === ticker);
}

export function getUberObject(coincapObj) {
	const key = coincapObj.short;
	const dbObj = getObjectByTicker(key);
	return _.extend(coincapObj, dbObj);
}