// ** React Imports
import { useState, Fragment, ChangeEvent, MouseEvent, ReactNode, useEffect } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
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
import { Autocomplete, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { countries, expertises } from 'src/utils/constants'
import { showSnackBar, hideSnackBar } from 'src/store/slices/snackbar.slice';
import { showBackdrop, hideBackdrop } from 'src/store/slices/backdrop.slice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface State {
  email: string
  password: string
  showPassword: boolean
  role: string
  first_name: string
  last_name: string
  country: string
  countryObject: CountryType | null
  expert_expertise: string
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '56rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  // ** States
  const [values, setValues] = useState<State>({
    email: '',
    password: '',
    showPassword: false,
    role: '',
    first_name: '',
    last_name: '',
    country: '',
    countryObject: null,
    expert_expertise: '',
  })

  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleSelectChange = (prop: keyof State) => (event: SelectChangeEvent<any>) => {
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
      message: `Processing your request: Please wait...` 
    }))

    fetch(API_URL + '/auth/register', options)
    .then((response) => response.json())
    .then((data) => {
      dispatch(hideBackdrop(null));

      if(data.success) {
        // dispatch(showSnackBar({ type: 'success', message: data.msg }));
        alert(`Your account is created successfully. Now redirects to login page`);
        router.push(`/pages/login`);
      } else { 
        dispatch(showSnackBar({ type: 'error', message: data.msg })); 
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch(hideBackdrop(null));
      dispatch(showSnackBar({ type: 'error', message: `Error on AJAX call: ${error.toString()}` })); 
    });
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
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>                
                {/** BEGIN: LEFT_SIDE_OF_SIGN_UP */}
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField autoFocus fullWidth id='first_name' label='First name' sx={{ marginBottom: 4 }} 
                      value={values.first_name}
                      onChange={handleChange('first_name')}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField autoFocus fullWidth id='last_name' label='Last name' sx={{ marginBottom: 4 }}                       
                      value={values.last_name}
                      onChange={handleChange('last_name')}
                    />
                  </Grid>                  
                </Grid>

                <FormControl fullWidth sx={{marginBottom: 4}}>
                  <Autocomplete
                    id="country-select-demo"
                    fullWidth
                    options={countries}
                    autoHighlight
                    getOptionLabel={(option) => option.label}
                    renderOption={(props, option) => (
                      <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        <img
                          loading="lazy"
                          width="20"
                          srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                          src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                          alt=""
                        />
                        {option.label} ({option.code})
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Choose a country"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                      />
                    )}
                    value={values?.countryObject}
                    onChange={(event, newValue: CountryType | null) => { 
                        setValues({ ...values, 
                          countryObject: newValue,
                          country: newValue?.code ?? ''
                        });
                    }}
                  />
                </FormControl>

                <FormControl fullWidth sx={{marginBottom: 4}}>
                  <InputLabel id="role-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="role-simple-select-label"
                    id="role-simple-select"
                    value={values?.role}
                    label="Role"
                    onChange={handleSelectChange('role')}
                  >
                    <MenuItem value={`client`}>🚀 Client</MenuItem>
                    <MenuItem value={`expert`}>👨‍💼 Expert</MenuItem>
                  </Select>
                </FormControl>
                    
                { values?.role === 'expert' && (                  
                  <FormControl fullWidth sx={{marginBottom: 4}}>
                    <InputLabel id="expertise-simple-select-label">Expertise</InputLabel>
                    <Select
                      labelId="expertise-simple-select-label"
                      id="expertise-simple-select"
                      value={values?.expert_expertise}
                      label="Expertise"
                      onChange={handleSelectChange('expert_expertise')}
                    >
                      { expertises.map((expertise: ExpertiseType, index: number) => 
                        <MenuItem value={expertise.code}>{expertise.label}</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                )}
                {/** END: LEFT_SIDE_OF_SIGN_UP */}
              </Grid>
              <Grid item xs={12} md={6}>
                {/** BEGIN: RIGHT_SIDE_OF_SIGN_UP */}
                <TextField fullWidth type='email' label='Email' sx={{ marginBottom: 4 }} 
                  value={values.email}
                  onChange={handleChange('email')}
                />
                <FormControl fullWidth>
                  <InputLabel htmlFor='auth-register-password'>Password</InputLabel>
                  <OutlinedInput
                    label='Password'
                    value={values.password}
                    id='auth-register-password'
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
                          {values.showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControlLabel
                  control={<Checkbox />}
                  label={
                    <Fragment>
                      <span>I agree to </span>
                      <Link href='/' passHref>
                        <LinkStyled onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                          privacy policy & terms
                        </LinkStyled>
                      </Link>
                    </Fragment>
                  }
                />
                <Button fullWidth size='large' type='submit' variant='contained' sx={{ marginBottom: 7 }}>
                  Sign up
                </Button>
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <Typography variant='body2' sx={{ marginRight: 2 }}>
                    Already have an account?
                  </Typography>
                  <Typography variant='body2'>
                    <Link passHref href='/pages/login'>
                      <LinkStyled>Sign in instead</LinkStyled>
                    </Link>
                  </Typography>
                </Box>
                {/** END: RIGHT_SIDE_OF_SIGN_UP */}
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

RegisterPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default RegisterPage
