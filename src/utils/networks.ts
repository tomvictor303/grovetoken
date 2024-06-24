const networks: Network[] = [
  {
    name: 'Grove',
    short_name: 'GRV',
    currency: 'GRV',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/23196.png',
    mainnet: {
      chainId: 770077,
      rpc: 'https://mainnet.grovechain.io/',
      explorer: 'https://grvscan.io/'
    },
    testnet: {
      chainId: 770077,
      rpc: 'https://testnet.grovechain.io/',
      explorer: 'https://testnet.grvscan.io/'
    }
  },
  {
    name: 'Ethereum',
    short_name: 'ETH',
    currency: 'ETH',
    icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    mainnet: {
      chainId: 1,
      rpc: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
      explorer: 'https://etherscan.io/'
    },
    testnet: {
      chainId: 5, // Goerli Testnet
      rpc: 'https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID',
      explorer: 'https://goerli.etherscan.io/'
    }
  },
  {
    name: 'Binance Smart Chain',
    short_name: 'BNB',
    currency: 'BNB',
    icon: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png',
    mainnet: {
      chainId: 56,
      rpc: 'https://bsc-dataseed.binance.org/',
      explorer: 'https://bscscan.com/'
    },
    testnet: {
      chainId: 97,
      rpc: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      explorer: 'https://testnet.bscscan.com/'
    }
  },
  {
    name: 'Arbitrum',
    short_name: 'ARB',
    currency: 'ETH',
    icon: 'https://cryptologos.cc/logos/arbitrum-arb-logo.png',
    mainnet: {
      chainId: 42161,
      rpc: 'https://arb1.arbitrum.io/rpc',
      explorer: 'https://arbiscan.io/'
    },
    testnet: {
      chainId: 421611,
      rpc: 'https://rinkeby.arbitrum.io/rpc',
      explorer: 'https://testnet.arbiscan.io/'
    }
  },
  {
    name: 'Polygon',
    short_name: 'MATIC',
    currency: 'MATIC',
    icon: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
    mainnet: {
      chainId: 137,
      rpc: 'https://rpc-mainnet.maticvigil.com/',
      explorer: 'https://polygonscan.com/'
    },
    testnet: {
      chainId: 80001,
      rpc: 'https://rpc-mumbai.maticvigil.com/',
      explorer: 'https://mumbai.polygonscan.com/'
    }
  },
  {
    name: 'Avalanche',
    short_name: 'AVAX',
    currency: 'AVAX',
    icon: 'https://cryptologos.cc/logos/avalanche-avax-logo.png',
    mainnet: {
      chainId: 43114,
      rpc: 'https://api.avax.network/ext/bc/C/rpc',
      explorer: 'https://cchain.explorer.avax.network/'
    },
    testnet: {
      chainId: 43113,
      rpc: 'https://api.avax-test.network/ext/bc/C/rpc',
      explorer: 'https://cchain.explorer.avax-test.network/'
    }
  },
  {
    name: 'Fantom',
    short_name: 'FTM',
    currency: 'FTM',
    icon: 'https://cryptologos.cc/logos/fantom-ftm-logo.png',
    mainnet: {
      chainId: 250,
      rpc: 'https://rpc.ftm.tools/',
      explorer: 'https://ftmscan.com/'
    },
    testnet: {
      chainId: 4002,
      rpc: 'https://rpc.testnet.fantom.network/',
      explorer: 'https://testnet.ftmscan.com/'
    }
  },
  {
    name: 'Cronos',
    short_name: 'CRO',
    currency: 'CRO',
    icon: 'https://cryptologos.cc/logos/cronos-cro-logo.png',
    mainnet: {
      chainId: 25,
      rpc: 'https://evm-cronos.crypto.org/',
      explorer: 'https://cronoscan.com/'
    },
    testnet: {
      chainId: 338,
      rpc: 'https://evm-t3.cronos.org/',
      explorer: 'https://testnet.cronoscan.com/'
    }
  },
  {
    name: 'zkSync',
    short_name: 'ZKS',
    currency: 'ETH',
    icon: 'https://cryptologos.cc/logos/zksync-zks-logo.png',
    mainnet: {
      chainId: 324,
      rpc: 'https://zksync2-mainnet.zksync.io',
      explorer: 'https://explorer.zksync.io/'
    },
    testnet: {
      chainId: 280,
      rpc: 'https://zksync2-testnet.zksync.dev',
      explorer: 'https://rinkeby-explorer.zksync.io/'
    }
  },
  {
    name: 'Base',
    short_name: 'BASE',
    currency: 'ETH',
    icon: 'https://cryptologos.cc/logos/base-base-logo.png',
    mainnet: {
      chainId: 8453,
      rpc: 'https://mainnet.base.org/',
      explorer: 'https://basescan.org/'
    },
    testnet: {
      chainId: 84531,
      rpc: 'https://goerli.base.org/',
      explorer: 'https://goerli.basescan.org/'
    }
  },
  {
    name: 'Shibarium',
    short_name: 'SHIB',
    currency: 'SHIB',
    icon: 'https://cryptologos.cc/logos/shiba-inu-shib-logo.png',
    mainnet: {
      chainId: 969,
      rpc: 'https://rpc.shibarium.network/',
      explorer: 'https://shibariumscan.com/'
    },
    testnet: {
      chainId: 971,
      rpc: 'https://testnet.shibarium.network/',
      explorer: 'https://testnet.shibariumscan.com/'
    }
  },
  {
    name: 'Optimism',
    short_name: 'OP',
    currency: 'ETH',
    icon: 'https://cryptologos.cc/logos/optimism-op-logo.png',
    mainnet: {
      chainId: 10,
      rpc: 'https://mainnet.optimism.io',
      explorer: 'https://optimistic.etherscan.io/'
    },
    testnet: {
      chainId: 420,
      rpc: 'https://goerli.optimism.io',
      explorer: 'https://goerli-optimism.etherscan.io/'
    }
  },
  {
    name: 'Boba Network',
    short_name: 'BOBA',
    currency: 'ETH',
    icon: 'https://cryptologos.cc/logos/boba-network-boba-logo.png',
    mainnet: {
      chainId: 288,
      rpc: 'https://mainnet.boba.network/',
      explorer: 'https://blockexplorer.boba.network/'
    },
    testnet: {
      chainId: 28,
      rpc: 'https://rinkeby.boba.network/',
      explorer: 'https://blockexplorer.rinkeby.boba.network/'
    }
  },
  {
    name: 'TomoChain',
    short_name: 'TOMO',
    currency: 'TOMO',
    icon: 'https://cryptologos.cc/logos/tomochain-tomo-logo.png',
    mainnet: {
      chainId: 88,
      rpc: 'https://rpc.tomochain.com',
      explorer: 'https://scan.tomochain.com/'
    },
    testnet: {
      chainId: 89,
      rpc: 'https://rpc.testnet.tomochain.com',
      explorer: 'https://scan.testnet.tomochain.com/'
    }
  }
];

export const getNetworkObject = (short_name: string): Network | null => {
  for (let i = 0; i < networks.length; i++) {
    if (networks[i].short_name === short_name) {
      return networks[i];
    }
  }
  return null;
}

export default networks;
