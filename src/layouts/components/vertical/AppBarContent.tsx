// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'
// ** MUI Imports
import Box from '@mui/material/Box'
import { Theme, styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'
import Magnify from 'mdi-material-ui/Magnify'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import { Button, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import ConnectWalletButton from 'src/views/custom/ConnectWalletButton'
import { useUser } from 'src/utils/context/User/UserProvider'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

const LogoImg = styled('img')({
  height: 36,
})

const TopMenuItem = styled(Typography)({
  cursor: 'pointer',
  minWidth: 100,
  textDecoration: 'unset', 
  '&:hover': {
    color: 'red',
  } 
})

const AppBarContent = (props: Props) => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  // ** Hook
  const hiddenSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  const router = useRouter()

  const { user } = useUser();
  const [ globalSearchWord, setGlobalSearchWord] = useState<string>("");

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden ? (
          <IconButton
            color='inherit'
            onClick={toggleNavVisibility}
            sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
          >
            <Menu />
          </IconButton>
        ) : null}
        <Box>
          <Link passHref href={`/`}>
            <LogoImg className={`cursorPoint`} alt='Home' src='/images/logos/logo2.png'/>
          </Link>
        </Box>
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        {/* We would not show NotificationDropdown for a while. We will start from small. */}
        {/* <NotificationDropdown /> */}
        
        <ConnectWalletButton />
      </Box>
    </Box>
  )
}

export default AppBarContent
