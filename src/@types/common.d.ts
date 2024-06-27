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

  type CommissionFee = {
    basic: number;
    custom: number;
    advance: number;
  }

  type Router = {
    name: string,
    address: string
  }

  type Network = {
    id: string;
    name: string;
    short_name: string;
    currency: string;
    icon: string;
    mainnet: NetworkConnection;
    testnet?: NetworkConnection;
    commission_fee?: CommissionFee;
    scan_name: string;
    routers?: Router[];
  }

  type TeamAddress = {
    address: string;
    percent: number;
  }
}

export {};