import * as _ from 'lodash';

const DB_OBJECT = [
	{
		"ticker": "BTC",
		"social": {
			"github": "bitcoin/bitcoin",
			"twitter": "bitcoin",
			"reddit": "bitcoin",
		}
	},
	{
		"ticker": "ETH",
		"social": {
			"github": "ethereum/go-ethereum",
			"twitter": "ethereum",
			"reddit": "ethereum",
		}
	},
	{
		"ticker": "LTC",
		"social": {
			"github": "litecoin-project/litecoin",
			"twitter": "litecoin",
			"reddit": "litecoin",
		}
	},
	{
		"ticker": "DASH",
		"social": {
			"github": "dashpay/dash",
			"twitter": "dashpay",
			"reddit": "dashpay",
		}
	},
	{
		"ticker": "XEM",
		"social": {
			"github": "NemProject/nem.core",
			"twitter": "NEMofficial",
			"reddit": "nem",
		}
	},
	{
		"ticker": "MIOTA",
		"social": {
			"github": "iotaledger/wallet",
			"twitter": "iotatoken",
			"reddit": "Iota",
			"slack": "https://slack.iota.org/"
		}
	},
	{
		"ticker": "XMR",
		"social": {
			"github": "monero-project/monero",
			"twitter": "monerocurrency",
			"reddit": "monero",
		}
	},
	{
		"ticker": "EOS",
		"social": {
			"github": "EOSIO/eos",
			"twitter": "eos_io",
			"reddit": "eos",
		}
	},
	{
		"ticker": "ZEC",
		"social": {
			"github": "zcash/zcash",
			"twitter": "zcashco",
			"reddit": "zec",
		}
	},
	{
		"ticker": "GNT",
		"social": {
			"github": "golemfactory/golem",
			"twitter": "golemproject",
			"reddit": "GolemProject",
		}
	},
	{
		"ticker": "CVC",
		"social": {
		"github": false,
		"twitter": "civickey",
		"reddit": "civicplatform",
		}
	},
	{
		"ticker": "SC",
		"social": {
			"github": "NebulousLabs/Sia",
			"twitter": "siatechhq",
			"reddit": "siacoin",
		}
	},
	{
		"ticker": "GNO",
		"social": {
			"github": "ConsenSys/gnosis-contracts",
			"twitter": "gnosisPM",
			"reddit": "gnosisPM",
		}
	},
	{
		"ticker": "STEEM",
		"social": {
			"github": "steemit/steem",
			"twitter": "Steemit",
			"reddit": "steemit",
		}
	},
	{
		"ticker": "UBQ",
		"social": {
			"github": "ubiq/go-ubiq",
			"twitter": "ubiqsmart",
			"reddit": "Ubiq",
		}
	},
	{
		"ticker": "DCR",
		"social": {
			"github": "decred/dcrd",
			"twitter": "decredproject",
			"reddit": "decredproject",
		}
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
