export type CoinCapItem = {
    cap24hrChange: string,
    mktcap: string,
    price: string,
    short: string,
    social: string,
    usdVolume: string
}

export type TableDataKey = 'short' | 'price' | 'mktcap' | 'usdVolume' | 'social'

export type CoinList = {
	blacklist: string[],
	data: any[],
	limit: number,
	orderBy: string[],
	orders: string[],
	topLimit: number,
	whitelist: string[]
}
