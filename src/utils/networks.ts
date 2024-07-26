const networks: Network[] = [
  {
    id: 'GRV',
    name: 'Grove',
    short_name: 'GRV',
    currency: 'GRV',
    icon: 'https://assets-global.website-files.com/62b03f7c4e77803f83b758a2/62b0c510ac78ba061da94401_newgrove-01_edited.png',
    mainnet: {
      chainId: 770077,
      rpc: 'https://mainnet.grovechain.io/',
      explorer: 'https://grvscan.io/'
    },
    testnet: {
      chainId: 770077,
      rpc: 'https://testnet.grovechain.io/',
      explorer: 'https://testnet.grvscan.io/'
    },
    commission_fee: {
      basic: 4400,
      custom: 17600,
      advance: 44000
    },
    scan_name: "GRVscan",
    routers: [
      {
        name: "Grove Bep20",
        address: "0xe4D96Cf7f47656200FBC3b6110DC8E785216EF0E"
      },
      {
        name: "Grove Erc20",
        address: "0x3711020351da65a99eb9a821Bb7706E193C9aaa0"
      },
    ],
    contracts: {
      BaseToken: "0xdC0f7B8a90424c54F16e22752ed62f38Ddc3De5C",
      CustomToken: "0xA0eEE45a6edaAd46D0F216493924Da4576650234",
      RewardToken: "0xc9aA60Af90480FbD26fD3508E81F5134Dcb25747",
      FeeReceiver: "0x19E0335A5d0Fc232Ed943f3092a02079f4853A71",
      Distributor: "0x5230d7af196e0AE3FA6712E05B9c060e051f5A24",
      DistributorGenerator: "0x7BBD7856CBa83C63126848042b0415cC7Fc56B65",
      TaxReceiverGenerator: "0xD75E24cd3F691f665EF0Ab1fd23dFBA49933Dd25",
      TokenGenerator: "0xEBb85B8334Bf430374fD24EBD96A8a6dC74F28A5",
    },
  },
  {
    id: 'BNB',
    name: 'Binance Smart Chain',
    short_name: 'BNB',
    currency: 'BNB',
    icon: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png',
    mainnet: {
      chainId: 56,
      rpc: 'https://bsc-dataseed.binance.org/',
      explorer: 'https://bscscan.com/'
    },
    commission_fee: {
      basic: 0.1,
      custom: 0.4,
      advance: 1
    },
    testnet: {
      chainId: 97,
      rpc: 'https://bsc-testnet.public.blastapi.io',
      explorer: 'https://testnet.bscscan.com/'
    },
    scan_name: "Bscscan",
    routers: [
      {
        name: "Uniswap V2",
        address: "0x10ED43C718714eb63d5aA57B78B54704E256024E"
      },
      {
        name: "Uniswap V3",
        address: "0x13f4EA83D0bd40E75C8222255bc855a974568Dd4"
      }
    ],
    contracts: {
      BaseToken: "0xdC0f7B8a90424c54F16e22752ed62f38Ddc3De5C",
      CustomToken: "0xA0eEE45a6edaAd46D0F216493924Da4576650234",
      RewardToken: "0xc9aA60Af90480FbD26fD3508E81F5134Dcb25747",
      FeeReceiver: "0x19E0335A5d0Fc232Ed943f3092a02079f4853A71",
      Distributor: "0x5230d7af196e0AE3FA6712E05B9c060e051f5A24",
      DistributorGenerator: "0x7BBD7856CBa83C63126848042b0415cC7Fc56B65",
      TaxReceiverGenerator: "0xD75E24cd3F691f665EF0Ab1fd23dFBA49933Dd25",
      TokenGenerator: "0xEBb85B8334Bf430374fD24EBD96A8a6dC74F28A5",
    },
  },
  {
    id: 'ETH',
    name: 'Ethereum',
    short_name: 'ETH',
    currency: 'ETH',
    icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    mainnet: {
      chainId: 1,
      rpc: 'https://eth.llamarpc.com',
      explorer: 'https://etherscan.io/'
    },
    testnet: {
      chainId: 5,
      rpc: 'https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID',
      explorer: 'https://goerli.etherscan.io/'
    },
    commission_fee: {
      basic: 0.028,
      custom: 0.112,
      advance: 0.28
    },
    scan_name: "Etherscan",
    routers: [
      {
        name: "Uniswap V2",
        address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
      },
      {
        name: "Uniswap V3",
        address: "0xE592427A0AEce92De3Edee1F18E0157C05861564"
      },
    ]
  },
  {
    id: 'BASE',
    name: 'Base',
    short_name: 'BASE',
    currency: 'ETH',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/27789.png',
    mainnet: {
      chainId: 8453,
      rpc: 'https://mainnet.base.org/',
      explorer: 'https://basescan.org/'
    },
    testnet: {
      chainId: 84531,
      rpc: 'https://goerli.base.org/',
      explorer: 'https://goerli.basescan.org/'
    },
    commission_fee: {
      basic: 0.028,
      custom: 0.112,
      advance: 0.28
    },
    scan_name: "Basescan",
    routers: [
      {
        name: "Uniswap Universal",
        address: "0x198EF79F1F515F02dFE9e3115eD9fC07183f02fC"
      }
    ]
  },
  {
    id: 'SHIB',
    name: 'Shibarium',
    short_name: 'SHIB',
    currency: 'BONE',
    icon: 'https://cryptologos.cc/logos/shiba-inu-shib-logo.png',
    mainnet: {
      chainId: 109,
      rpc: 'https://www.shibrpc.com',
      explorer: 'https://shibariumscan.io'
    },
    testnet: {
      chainId: 157,
      rpc: 'https://puppynet.shibrpc.com',
      explorer: 'https://puppyscan.shib.io'
    },
    commission_fee: {
      basic: 195,
      custom: 780,
      advance: 1950
    },
    scan_name: "Shibariumscan",
    routers: [
      {
        name: "ChewySwap",
        address: "0x2875F2D86d83635A859029872e745581530cEec7"
      },
      {
        name: "Uniswap V2",
        address: "0xEF83bbB63E8A7442E3a4a5d28d9bBf32D7c813c8"
      },
    ]
  },
  {
    id: 'MATIC',
    name: 'Polygon',
    short_name: 'MATIC',
    currency: 'MATIC',
    icon: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
    mainnet: {
      name: 'Polygon Mainnet',
      chainId: 137,
      rpc: 'https://rpc-mainnet.maticvigil.com/',
      explorer: 'https://polygonscan.com/'
    },
    testnet: {
      chainId: 80001,
      rpc: 'https://rpc-mumbai.maticvigil.com/',
      explorer: 'https://mumbai.polygonscan.com/'
    },
    commission_fee: {
      basic: 125,
      custom: 500,
      advance: 1250
    },
    scan_name: "Polygonscan",
    routers: [
      {
        name: "QuickStop",
        address: "0xf5b509bB0909a69B1c207E495f687a596C168E12"
      },
      {
        name: "Uniswap V3",
        address: "0xE592427A0AEce92De3Edee1F18E0157C05861564"
      },
    ]
  },
  {
    id: 'ARB',
    name: 'Arbitrum',
    short_name: 'ARB',
    currency: 'ETH',
    icon: 'https://cryptologos.cc/logos/arbitrum-arb-logo.png',
    mainnet: {
      name: 'Arbitrum One',
      chainId: 42161,
      rpc: 'https://arb1.arbitrum.io/rpc',
      explorer: 'https://arbiscan.io/'
    },
    testnet: {
      chainId: 421611,
      rpc: 'https://rinkeby.arbitrum.io/rpc',
      explorer: 'https://testnet.arbiscan.io/'
    },
    commission_fee: {
      basic: 0.028,
      custom: 0.112,
      advance: 0.28
    },
    scan_name: "Arbiscan",
    routers: [
      {
        name: "GMX",
        address: "0xaBBc5F99639c9B6bCb58544ddf04EFA6802F4064"
      },
      {
        name: "Zyber",
        address: "0x16e71B13fE6079B4312063F7E81F76d165Ad32Ad"
      },
    ]
  },
  {
    id: 'AVAX',
    name: 'Avalanche',
    short_name: 'AVAX',
    currency: 'AVAX',
    icon: 'https://cryptologos.cc/logos/avalanche-avax-logo.png',
    mainnet: {
      name: "Avalanche C-Chain",
      chainId: 43114,
      rpc: 'https://api.avax.network/ext/bc/C/rpc',
      explorer: 'https://cchain.explorer.avax.network/'
    },
    testnet: {
      chainId: 43113,
      rpc: 'https://api.avax-test.network/ext/bc/C/rpc',
      explorer: 'https://cchain.explorer.avax-test.network/'
    },
    commission_fee: {
      basic: 2.5,
      custom: 10,
      advance: 25
    },
    scan_name: "SnowTrace",
    routers: [
      {
        name: "SushiSwap",
        address: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506"
      }
    ]
  },
  {
    id: 'FTM',
    name: 'Fantom',
    short_name: 'FTM',
    currency: 'FTM',
    icon: 'https://cryptologos.cc/logos/fantom-ftm-logo.png',
    mainnet: {
      name: "Fantom Opera",
      chainId: 250,
      rpc: 'https://rpc.ftm.tools/',
      explorer: 'https://ftmscan.com/'
    },
    testnet: {
      chainId: 4002,
      rpc: 'https://rpc.testnet.fantom.network/',
      explorer: 'https://testnet.ftmscan.com/'
    },
    commission_fee: {
      basic: 50,
      custom: 200,
      advance: 500
    },
    scan_name: "FTMscan",
    routers: [
      {
        name: "SpookySwap",
        address: "0xF491e7B69E4244ad4002BC14e878a34207E38c29"
      }
    ]
  },
  {
    id: 'ZKS',
    name: 'zkSync',
    short_name: 'ZKS',
    currency: 'ETH',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/24091.png',
    mainnet: {
      name: "zkSync Mainnet",
      chainId: 324,
      rpc: 'https://mainnet.era.zksync.io',
      explorer: 'https://explorer.zksync.io/'
    },
    testnet: {
      chainId: 280,
      rpc: 'https://zksync2-testnet.zksync.dev',
      explorer: 'https://rinkeby-explorer.zksync.io/'
    },
    commission_fee: {
      basic: 0.01,
      custom: 0.04,
      advance: 0.1
    },
    scan_name: "ERA",
    routers: [
      {
        name: "Pancakeswap V2",
        address: "0x5aEaF2883FBf30f3D62471154eDa3C0c1b05942d"
      }
    ]
  },
  {
    id: 'ATOM',
    name: 'Cosmos',
    short_name: 'ATOM',
    currency: 'ATOM',
    icon: 'https://cryptologos.cc/logos/cosmos-atom-logo.png',
    mainnet: {
      chainId: 1,
      rpc: 'https://rpc.cosmos.network',
      explorer: 'https://cosmos.bigdipper.live/'
    },
    commission_fee: {
      basic: 4.4,
      custom: 17.6,
      advance: 44
    },
    testnet: {
      chainId: 2,
      rpc: 'https://rpc.testnet.cosmos.network',
      explorer: 'https://testnet.cosmos.bigdipper.live/'
    },
    scan_name: "ATOMscan"
  },
  {
    id: 'OP',
    name: 'Optimism',
    short_name: 'OP',
    currency: 'ETH',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/11840.png',
    mainnet: {
      name: "OP Mainnet",
      chainId: 10,
      rpc: 'https://mainnet.optimism.io',
      explorer: 'https://optimistic.etherscan.io/'
    },
    testnet: {
      chainId: 420,
      rpc: 'https://goerli.optimism.io',
      explorer: 'https://goerli-optimism.etherscan.io/'
    },
    commission_fee: {
      basic: 28,
      custom: 112,
      advance: 280
    },
    scan_name: "OP Mainnet"
  },
  {
    id: 'BOBA',
    name: 'Boba Network',
    short_name: 'BOBA',
    currency: 'ETH',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/14556.png',
    mainnet: {
      chainId: 288,
      rpc: 'https://mainnet.boba.network/',
      explorer: 'https://blockexplorer.boba.network/'
    },
    testnet: {
      chainId: 28,
      rpc: 'https://rinkeby.boba.network/',
      explorer: 'https://blockexplorer.rinkeby.boba.network/'
    },
    commission_fee: {
      basic: 0.028,
      custom: 0.112,
      advance: 0.28
    },
    scan_name: "Bobascan"
  },
  {
    id: 'VIC',
    name: 'Viction (formerly Tomo)',
    short_name: 'VIC',
    currency: 'VIC',
    icon: 'https://cryptologos.cc/logos/tomochain-tomo-logo.png',
    mainnet: {
      name: "Viction",
      chainId: 88,
      rpc: 'https://rpc.viction.xyz',
      explorer: 'https://www.vicscan.xyz/'
    },
    testnet: {
      chainId: 89,
      rpc: 'https://rpc.testnet.tomochain.com',
      explorer: 'https://scan.testnet.tomochain.com'
    },
    commission_fee: {
      basic: 75,
      custom: 300,
      advance: 750
    },
    scan_name: "Tomoscan"
  },
  {
    id: 'GNO',
    name: 'Gnosis',
    short_name: 'GNO',
    currency: 'XDAI',
    icon: 'https://cryptologos.cc/logos/gnosis-gno-logo.png',
    mainnet: {
      chainId: 100,
      rpc: 'https://rpc.gnosischain.com',
      explorer: 'https://blockscout.com/xdai/mainnet/'
    },
    testnet: {
      chainId: 10200,
      rpc: 'https://rpc.chiadochain.net',
      explorer: 'https://blockscout.com/gnosis/chiado/'
    },
    commission_fee: {
      basic: 0.1,
      custom: 0.4,
      advance: 1
    },
    scan_name: "xDAI"
  },
  {
    id: 'CRO',
    name: 'Cronos',
    short_name: 'CRO',
    currency: 'CRO',
    icon: 'https://cryptologos.cc/logos/cronos-cro-logo.png',
    mainnet: {
      name: "Cronos Mainnet",
      chainId: 25,
      rpc: 'https://evm.cronos.org',
      explorer: 'https://explorer.cronos.org/'
    },
    testnet: {
      chainId: 338,
      rpc: 'https://evm-t3.cronos.org/',
      explorer: 'https://testnet.cronoscan.com/'
    },
    commission_fee: {
      basic: 550,
      custom: 2200,
      advance: 5500
    },
    scan_name: "Cronoscan"
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
