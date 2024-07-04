// context/Web3Modal.tsx
'use client'

import { createWeb3Modal, defaultConfig, useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react'
import { createContext, useContext, useEffect, useState } from 'react'
import { AbiCoder, BrowserProvider, encodeBase64, ethers } from 'ethers'
import { Web3Modal } from '@web3modal/ethers'
import createWeb3ModalInstance from './web3modal'

import { showSnackBar, hideSnackBar } from 'src/store/slices/snackbar.slice';
import { showBackdrop, hideBackdrop } from 'src/store/slices/backdrop.slice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import BaseToken from 'src/utils/abis/BaseToken.json'
import TokenGenerator from 'src/utils/abis/TokenGenerator.json'

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const MAIN_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS;
const TOKEN_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS;

const Web3Context = createContext<any>(null)

export const Web3Provider = ({ children }: any) => {
  const dispatch = useAppDispatch();

  const [web3ModalInstance, setWeb3ModalInstance] = useState<Web3Modal | null>(null);
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
    console.log('wallet account change', address, chainId, isConnected)
    wallet_account_change_handler(address, chainId, isConnected, walletProvider);
  }, [address, chainId, isConnected, walletProvider])

  const wallet_account_change_handler = async (address: any, chainId: number | undefined, isConnected: boolean, walletProvider: any) => {
    if (!address || !walletProvider) { return; }

    return; // Nothing to do now.
  }

  const web3_generate_token = async (
    network: Network,
    name: string,
    symbol: string,
    decimals: number,
    totalSupply: number,
    mintable: boolean,
    burnable: boolean,
    tokenType: number
  ): Promise<void> => {
    if (!address || !walletProvider || !isConnected) {
      throw new Error(`Wallet is not connected`);
    }
    if (!network?.contracts) {
      throw new Error(`The contract address is not defined on this network.`);
    }
    const provider = new BrowserProvider(walletProvider)
    const signer = await provider.getSigner()

    const mainContract = new ethers.Contract(network.contracts?.TokenGenerator, TokenGenerator.result, signer);

    const amountBigInt: BigInt = ethers.parseUnits(totalSupply.toString(), decimals);

    // Encode the parameters into bytes
    const abiCoder = new AbiCoder;
    const initPayload = abiCoder.encode(
      ["string", "string", "uint8", "uint256", "bool", "bool", "address"],
      [name, symbol, decimals, amountBigInt, mintable, burnable, address]
    );
    const extraPayload = abiCoder.encode(
      ["string"],
      [""]
    );

    try {
      const transaction = await mainContract.generate(initPayload, extraPayload, tokenType, [], {
        value: ethers.parseEther("1.0")
      });
      dispatch(showBackdrop({ message: `Token creation is in progress. Please wait ...` }));
      const receipt = await transaction.wait(); // Wait for transaction to be mined

      console.log('Transaction receipt:', receipt);
    } catch (error: any) {
      console.log(error)
      if (error?.action === "estimateGas" && error?.reason) {
        throw new Error(error.reason);
      }
      if (error?.action === "signMessage" && error?.code === "ACTION_REJECTED") {
        throw new Error(`You rejected web3 action!`)
      }
      if (error?.action === "sendTransaction" && error?.reason === "rejected") {
        throw new Error(`You rejected the transaction!`)
      }
      throw error;
    }
  }

  return (
    <Web3Context.Provider value={{ web3ModalInstance, web3_generate_token }}>
      {children}
    </Web3Context.Provider>
  )
}

export const useWeb3 = () => useContext(Web3Context)
