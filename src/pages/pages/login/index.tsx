// ** React Imports
import { ChangeEvent, MouseEvent, ReactNode, useEffect, useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Icons Imports
import Google from 'mdi-material-ui/Google'
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import { Alert } from '@mui/material'
import { showSnackBar, hideSnackBar } from 'src/store/slices/snackbar.slice';
import { showBackdrop, hideBackdrop } from 'src/store/slices/backdrop.slice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { useUser } from 'src/utils/context/User/UserProvider'
import ConnectWalletButton from 'src/views/custom/ConnectWalletButton'
import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react'
import { BrowserProvider } from 'ethers'

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface State {
  email: string
  password: string
  showPassword: boolean
}

interface LoginResult {
  status: 'error' | 'success',
  message: string
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginPage = () => {
  const dispatch = useAppDispatch();
  // ** State
  const [values, setValues] = useState<State>({
    email: '',
    password: '',
    showPassword: false
  })

  const [loginResult, setLoginResult] = useState<LoginResult | null>(null);

  // ** Hook
  const theme = useTheme()
  const router = useRouter()
  const { setUser, setJwtToken } = useUser();

  // isBrowser 
  const [ isBrowser, setIsBrowser ] = useState<boolean>(false);
  useEffect(() => { setIsBrowser(true)}, [])

  // web3
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(values);

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

    fetch(API_URL + '/auth/login', options)
    .then((response) => response.json())
    .then((data) => {
      dispatch(hideBackdrop(null));

      if(data.success) {
        setLoginResult({ status: 'success', message: 'Succefully Logined.'})
        setUser(data?.user)
        setJwtToken(data?.jwt_token)
        router.push('/')
      } else { 
        setLoginResult({ status: 'error', message: data.msg})
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch(hideBackdrop(null));
      setLoginResult({ status: 'error', message: `Error on AJAX call: ${error.toString()}`})
      // dispatch(showSnackBar({ type: 'error', message: `Error on AJAX call: ${error.toString()}` })); 
    });
  }

  const wallet_account_login_handler = async () => {
    if (!address || !walletProvider || !isConnected ) {       
      return dispatch(showSnackBar({ type: 'error', message: `Wallet is not connected` })); 
    }
    
    try {
      dispatch(showBackdrop({ 
        message: `Login with wallet address. Please wait ...` 
      }))

      let response = await fetch(`${API_URL}/auth/crypto_nonce?wallet_address=${address}`);
      let { success, msg, code, nonce } = await response.json();
      if ( !success ) {
        if ( code === `NOT_REGISTERED_WALLET` ) {
          /////////////////////////////////////////////
        }
        throw new Error(msg);
      }

      dispatch(showBackdrop({ 
        message: `Please sign login message with your wallet...` 
      }))

      const provider = new BrowserProvider(walletProvider)
      const signer = await provider.getSigner()
      const signature = await signer?.signMessage(`LoginWithNonce_${nonce}`)
      console.log(signature)
      
      // Send the signature and wallet address to the backend for verification
      response = await fetch(`${API_URL}/auth/verify_crypto_signature`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wallet_address: address, signature }),
      });

      let jsondata = await response.json();
      if(jsondata?.success) {
        setUser(jsondata?.user)
        setJwtToken(jsondata?.jwt_token)
      } else { 
        throw new Error(jsondata?.msg);
      }

      dispatch(showSnackBar({ type: 'success', message: `Successfully logined` }));
      dispatch(hideBackdrop(null));
      router.push('/')
    } catch(error: any) {
      console.log(error);
      dispatch(hideBackdrop(null));
      if ( error?.action === "signMessage" && error?.code === "ACTION_REJECTED" ) {
        return dispatch(showSnackBar({ type: 'error', message: `You rejected login signature!` })); 
      }
      dispatch(showSnackBar({ type: 'error', message: `${error.message || error.toString()}` })); 
    }
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Link passHref href='/'>            
              <img className={`cursorPoint`} height={120} src={'/images/logos/logo.png'}/>
            </Link>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Welcome to Asked.app! 👋🏻
            </Typography>
            <Typography variant='body2'>Please sign-in to your account and start the adventure</Typography>
          </Box>

          { loginResult && (
            <Alert severity={loginResult?.status} sx={{mb: 1}} style={{marginBottom: "1em" }}>{loginResult?.message}</Alert>
          )}

          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <TextField autoFocus fullWidth id='email' label='Email' sx={{ marginBottom: 4 }} 
              value={values.email}
              onChange={handleChange('email')}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                value={values.password}
                id='auth-login-password'
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <FormControlLabel control={<Checkbox />} label='Remember Me' />
              <Link passHref href='/'>
                <LinkStyled onClick={e => e.preventDefault()}>Forgot Password?</LinkStyled>
              </Link>
            </Box>
            <Button
              type='submit'
              fullWidth
              size='large'
              variant='contained'
              sx={{ marginBottom: 7 }}
            >
              Login
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                New on our platform?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/pages/register'>
                  <LinkStyled>Create an account</LinkStyled>
                </Link>
              </Typography>
            </Box>

            {/** BEGIN login_with_wallet_block */}
            <Divider sx={{ my: 5 }}>or</Divider>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box>
                  { isBrowser && (<w3m-button balance='hide'/>)}
                </Box>
            </Box>
            
            <Box mt={4}>
              { isConnected &&(
                <Button
                  fullWidth
                  size='large'
                  variant='outlined'
                  sx={{ marginBottom: 7 }}
                  onClick={()=> { wallet_account_login_handler(); }}
                >
                  Login with Wallet
                </Button>
              )}
            </Box>
            {/** END login_with_wallet_block */}

            {/* <Divider sx={{ my: 5 }}>or</Divider>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Link href='/' passHref>
                <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                  <Facebook sx={{ color: '#497ce2' }} />
                </IconButton>
              </Link>
              <Link href='/' passHref>
                <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                  <Twitter sx={{ color: '#1da1f2' }} />
                </IconButton>
              </Link>
              <Link href='/' passHref>
                <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                  <Github
                    sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : theme.palette.grey[300]) }}
                  />
                </IconButton>
              </Link>
              <Link href='/' passHref>
                <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                  <Google sx={{ color: '#db4437' }} />
                </IconButton>
              </Link>
            </Box> */}
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginPage
