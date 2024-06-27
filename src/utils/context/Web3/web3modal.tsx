// context/Web3Modal.tsx
'use client'

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'
import { createContext, useContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { Web3Modal } from '@web3modal/ethers'
import networks from 'src/utils/networks';

// Your WalletConnect Cloud project ID
export const projectId = 'd8b2c472e28bcf134eb8aed8b8c9ed22'

const chains: any[] = [];

chains.push({
  name: networks[0].name,
  currency: networks[0].currency,
  rpcUrl: networks[0].mainnet.rpc,
  chainId: networks[0].mainnet.chainId,
  explorerUrl: networks[0].mainnet.explorer,
})

chains.push({
  name: networks[0].name + ' Testnet',
  currency: networks[0].currency,
  rpcUrl: networks[0]?.testnet?.rpc,
  chainId: networks[0]?.testnet?.chainId,
  explorerUrl: networks[0]?.testnet?.explorer,
})

for (let i = 1; i < networks.length; i++) {
  chains.push({
    name: networks[i].mainnet.name ?? networks[i].name,
    currency: networks[i].currency,
    rpcUrl: networks[i].mainnet.rpc,
    chainId: networks[i].mainnet.chainId,
    explorerUrl: networks[i].mainnet.explorer,
  })
}

// Metadata
const metadata = {
  name: 'Asked App',
  description: 'Consultation platform between clients and experts',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Ethers config
const ethersConfig = defaultConfig({
  metadata,
  enableEIP6963: true,
  enableInjected: true,
  enableCoinbase: true,
  rpcUrl: '...',
  defaultChainId: 1,
})

const createWeb3ModalInstance = (): Web3Modal => { 
  // Create Web3Modal instance
  return createWeb3Modal({
    ethersConfig,
    chains,
    projectId,
    enableAnalytics: true,
    enableOnramp: true
  });
};

export default createWeb3ModalInstance;