declare global {
  type ID = string | number;
  type IdName = {
    id: ID,
    name: string;
  }

  interface Dict<Type> {
    [key: string]: Type;
  }

  type CountryType = {
    code: string;
    label: string;
    phone: string;
    suggested?: boolean;
  }

  enum TokenType {
    Basic = 0,
    Custom = 1,
    Advance = 2,
  }

  type NetworkConnection = {
    chainId: number;
    rpc: string;
    explorer: string;
  }

  type Network = {
    name: string;
    short_name: string;
    currency: string;
    mainnet: NetworkConnection;
    testnet?: NetworkConnection;
  }
}

export {};