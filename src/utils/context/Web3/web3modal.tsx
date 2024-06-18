// context/Web3Modal.tsx
'use client'

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'
import { createContext, useContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { Web3Modal } from '@web3modal/ethers'

// Your WalletConnect Cloud project ID
export const projectId = 'd8b2c472e28bcf134eb8aed8b8c9ed22'

// BSC Mainnet
const bscMainnet = {
  chainId: 56,
  name: 'Binance Smart Chain',
  currency: 'BNB',
  explorerUrl: 'https://bscscan.com',
  rpcUrl: 'https://bsc-dataseed.binance.org/'
}

// BSC Testnet
const bscTestnet = {
  chainId: 97,
  name: 'Binance Smart Chain Testnet',
  currency: 'BNB',
  explorerUrl: 'https://testnet.bscscan.com',
  rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
}

const chains: any[] = [];
if ( process.env.NEXT_PUBLIC_IS_TESTNET ) {
  chains.push( bscTestnet )
} else {
  chains.push( bscMainnet )
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