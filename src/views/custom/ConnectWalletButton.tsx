'use client'

import { Box, Button } from "@mui/material"
import { useWeb3ModalAccount, useWeb3Modal } from "@web3modal/ethers/react"
import { useEffect, useState } from "react";

function CustomOpenButton() {  
  // 4. Use modal hook
  const { open } = useWeb3Modal();
  return <>
    <Button variant="contained" color="success" size="large" onClick={() => open()}>Connect</Button>
  </>
}

export default function ConnectWalletButton() {
  // web3
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  // state
  const [ isBrowser, setIsBrowser ] = useState<boolean>(false);

  useEffect(() => {
    setIsBrowser(true);
  }, [])

  return <>
    <Box visibility={isConnected ? 'visible':'hidden'}>
      <w3m-button balance="hide" />
    </Box>
    {
      isBrowser && (
        <Box visibility={!isConnected ? 'visible':'hidden'}>
          <CustomOpenButton />
        </Box>
      )
    }
  </>
}