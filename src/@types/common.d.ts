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

  type NetworkConnection = {
    chainId: number;
    rpc: string;
    explorer: string;
  }

  type Network = {
    name: string;
    short_name: string;
    currency: string;
    icon: string;
    mainnet: NetworkConnection;
    testnet?: NetworkConnection;
  }
}

export {};