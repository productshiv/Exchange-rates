export interface CryptoRate {
  value: string;
  basePair: string;
  timestamp: number;
  source: string;
  id: string;
}

export interface CryptoInfo {
  id: string;
  name: string;
  symbol: string;
  logoUrl: string;
}

export const CRYPTO_LIST: CryptoInfo[] = [
  {
    id: "BTC",
    name: "Bitcoin",
    symbol: "BTC",
    logoUrl: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg"
  },
  {
    id: "BNB",
    name: "Binance Coin",
    symbol: "BNB",
    logoUrl: "https://cryptologos.cc/logos/bnb-bnb-logo.svg"
  },
  {
    id: "DOGE",
    name: "Dogecoin",
    symbol: "DOGE",
    logoUrl: "https://cryptologos.cc/logos/dogecoin-doge-logo.svg"
  },
  {
    id: "ETH",
    name: "Ethereum",
    symbol: "ETH",
    logoUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.svg"
  },
  {
    id: "LINK",
    name: "Chainlink",
    symbol: "LINK",
    logoUrl: "https://cryptologos.cc/logos/chainlink-link-logo.svg"
  },
  {
    id: "LTC",
    name: "Litecoin",
    symbol: "LTC",
    logoUrl: "https://cryptologos.cc/logos/litecoin-ltc-logo.svg"
  },
  {
    id: "MATIC",
    name: "Polygon",
    symbol: "POL",
    logoUrl: "https://cryptologos.cc/logos/polygon-matic-logo.svg"
  },
  {
    id: "XRP",
    name: "XRP",
    symbol: "XRP",
    logoUrl: "https://cryptologos.cc/logos/xrp-xrp-logo.svg"
  }
]; 