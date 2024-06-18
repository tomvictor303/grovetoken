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
import { useUser } from '../User/UserProvider'
import FreelancePlatform from 'src/utils/abis/FreelancePlatform.json'
import AskToken from 'src/utils/abis/AskToken.json'

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

  const { user, setUser, setJwtToken } = useUser();

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
    if ( user ) { return; }

    return; // Nothing to do now.
  }

  const web3_createJob = async ( jobId: number, freelancer_wallet: string, budget: number ) => {
    if (!address || !walletProvider || !isConnected || !MAIN_CONTRACT_ADDRESS || !TOKEN_CONTRACT_ADDRESS) {     
      return dispatch(showSnackBar({ type: 'error', message: `Wallet is not connected` })); 
    }

    const provider = new BrowserProvider(walletProvider)
    const signer = await provider.getSigner()

    const mainContract = new ethers.Contract(MAIN_CONTRACT_ADDRESS, FreelancePlatform.abi, signer);
    try {
      const transaction = await mainContract.createJob(jobId, freelancer_wallet, ethers.parseEther(budget.toString()));
      const receipt = await transaction.wait(); // Wait for transaction to be mined

      console.log('Transaction receipt:', receipt);
    } catch(error: any) {      
      console.log(error);
      dispatch(hideBackdrop(null));
      if ( error?.action === "estimateGas") {
        return dispatch(showSnackBar({ type: 'error', message: `${error.reason || error.toString()}` })); 
      }
      if ( error?.action === "signMessage" && error?.code === "ACTION_REJECTED" ) {
        return dispatch(showSnackBar({ type: 'error', message: `You rejected web3 action!` })); 
      }
      return dispatch(showSnackBar({ type: 'error', message: `${error.message || error.toString()}` })); 
    }
    
  }

  const web3_get_allowance = async (): Promise<number> => {
    if (!address || !walletProvider || !isConnected || !MAIN_CONTRACT_ADDRESS || !TOKEN_CONTRACT_ADDRESS) {      
      throw new Error(`Wallet is not connected`); 
    }

    const provider = new BrowserProvider(walletProvider)
    const signer = await provider.getSigner()

    const tokenContract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, AskToken.abi, signer);
    try {
      const allowance = await tokenContract.allowance(address, MAIN_CONTRACT_ADDRESS);
      console.log(`allowance`, allowance)
      return allowance;
    } catch(error: any) {
      throw error;
    }
    
    return 0;
  }

  return (
    <Web3Context.Provider value={{ web3ModalInstance, web3_createJob, web3_get_allowance }}>
      {children}
    </Web3Context.Provider>
  )
}

export const useWeb3 = () => useContext(Web3Context)
