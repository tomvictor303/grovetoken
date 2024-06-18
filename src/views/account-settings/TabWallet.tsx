// ** React Imports
import { useState, ElementType, ChangeEvent, SyntheticEvent, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button, { ButtonProps } from '@mui/material/Button'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

import { countries, expertises, getCountryObject } from 'src/utils/constants'
import { Autocomplete, Stack } from '@mui/material'
import { useWeb3ModalAccount } from '@web3modal/ethers/react'

import { showSnackBar, hideSnackBar } from 'src/store/slices/snackbar.slice';
import { showBackdrop, hideBackdrop } from 'src/store/slices/backdrop.slice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { useUser } from 'src/utils/context/User/UserProvider'

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

interface State {
  wallet_address: string
  new_wallet_address: string
}

const TabWallet = () => {
  const dispatch = useAppDispatch();
  // ** State
  const { user, syncUserInfo } = useUser()
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  
  const [values, setValues] = useState<State>({
    wallet_address: '',
    new_wallet_address: '',
  })

  useEffect(() => {
    setValues(user)
  }, [user])

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleAutoFillWithConnected = () => {
    if ( !address || !isConnected) {
      return;
    }
    setValues((prev) => {
      return {...prev, new_wallet_address: address}
    })
  }

  const handleReset = () => {    
    setValues((prev) => {
      return {...prev, new_wallet_address: ''}
    })
  }
  
  const handleSubmit = (e: any) => {
    e.preventDefault();

    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    };

    dispatch(showBackdrop({ 
      message: `Please wait...` 
    }))

    fetch(API_URL + '/users/change_my_wallet_address', options)
    .then((response) => response.json())
    .then(async (data) => {
      dispatch(hideBackdrop(null));

      if(data.success) {
        dispatch(showSnackBar({ type: 'success', message: ''}));
        alert(data.msg)
        await syncUserInfo();
      } else { 
        dispatch(showSnackBar({ type: 'error', message: data.msg}));
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch(hideBackdrop(null));
      dispatch(showSnackBar({ type: 'error', message: `Error on AJAX call: ${error.toString()}` })); 
    });
  }

  return (
    <CardContent>
      <form autoComplete='off' onSubmit={handleSubmit}>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Box><Typography variant='body1'>Current wallet address:</Typography></Box>
                <TextField fullWidth value={values?.wallet_address} disabled />
              </Grid>
              <Grid item xs={12}>
                <Box><Typography variant='body1'>New wallet address:</Typography></Box>
                <TextField fullWidth value={values?.new_wallet_address} onChange={handleChange('new_wallet_address')} required/>

                <Stack direction={'row'} spacing={2} mt={1}>
                  <Button variant='contained' color='info' onClick={handleAutoFillWithConnected}>Autofill with connected</Button>
                  <Button variant='outlined' color='secondary' onClick={handleReset}>
                    Reset
                  </Button>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Button variant='contained' type='submit' sx={{ marginRight: 3.5 }}>
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Alert color='info' icon={false}>
              <ul>
                <li>For expert, wallet registeration is mandatory to start service. Client 's payments will be sent to this wallet address.</li>
              </ul>
              <ul>
                <li>For client, this is optional. Client can use any wallet for payment.</li>
              </ul>
              <ul>
                <li>For any user, this wallet address is used for <i>"Login with wallet"</i>.</li>
              </ul>
            </Alert>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabWallet
