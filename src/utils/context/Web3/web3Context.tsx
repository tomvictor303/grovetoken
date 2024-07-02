// context/Web3Modal.tsx
'use client'

import { createWeb3Modal, defaultConfig, useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react'
import { createContext, useContext, useEffect, useState } from 'react'
import { BrowserProvider, ethers } from 'ethers'
import { Web3Modal } from '@web3modal/ethers'
import createWeb3ModalInstance from './web3modal'

import { showSnackBar, hideSnackBar } from 'src/store/slices/snackbar.slice';
import { showBackdrop, hideBackdrop } from 'src/store/slices/backdrop.slice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const MAIN_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS;
const TOKEN_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS;

const Web3Context = createContext<any>(null)

export const Web3Provider = ({ children }: any) => {
  const dispatch = useAppDispatch();

  const [ web3ModalInstance, setWeb3ModalInstance ] = useState<Web3Modal | null>(null);
  const { walletProvider } = useWeb3ModalProvider()

  // Please reference documenation from here.
  // https://docs.walletconnect.com/web3modal/nextjs/hooks?platform=ethers
  const { address, chainId, isConnected } = useWeb3ModalAccount()

  useEffect(() => {
    console.log('BEGIN Web3Provider Init ----------------------------------------------------');
    setWeb3ModalInstance(createWeb3ModalInstance());
    console.log('END Web3Provider Init ----------------------------------------------------');
  }, [])

  useEffect(() => {
    console.log('wallet account change', address, chainId, isConnected )
    wallet_account_change_handler( address, chainId, isConnected, walletProvider );
  }, [ address, chainId, isConnected, walletProvider ])

  const wallet_account_change_handler = async ( address: any, chainId: number | undefined, isConnected: boolean, walletProvider: any ) => {
    if (!address || !walletProvider) { return; }

    return; // Nothing to do now.
  }

  return (
    <Web3Context.Provider value={{ web3ModalInstance }}>
      {children}
    </Web3Context.Provider>
  )
}

export const useWeb3 = () => useContext(Web3Context)
