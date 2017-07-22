export interface CoinCapItem {
    cap24hrChange: string,
    mktcap: string,
    price: string,
    short: string,
    social: string,
    usdVolume: string
}

export type TableDataKey = 'short' | 'price' | 'mktcap' | 'usdVolume' | 'social'