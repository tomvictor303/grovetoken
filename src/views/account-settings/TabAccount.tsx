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
import { useUser } from 'src/utils/context/User/UserProvider'

import { countries, expertises, getCountryObject } from 'src/utils/constants'
import { Autocomplete } from '@mui/material'

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

const TabAccount = () => {
  // ** State
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')
  const { user } = useUser()
  
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

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)

      reader.readAsDataURL(files[0])
    }
  }

  const handleSelectChange = (prop: keyof State) => (event: SelectChangeEvent<any>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  
  useEffect(() => {
    if ( user ) {
      let ud = user;
      ud['countryObject'] = getCountryObject(ud.country);
      setValues(ud)
    }
  }, [user])

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          {/* <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                  Reset
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid> */}

          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='First name' value={values?.first_name} disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Last name' value={values?.last_name} disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='email'
              label='Email'
              value={values?.email} disabled 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select label='Role' value={values?.role} disabled>                
                <MenuItem value={`client`}>🚀 Client</MenuItem>
                <MenuItem value={`expert`}>👨‍💼 Expert</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
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
              disabled
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            { values?.role === 'expert' && (                  
              <FormControl fullWidth sx={{marginBottom: 4}}>
                <InputLabel id="expertise-simple-select-label">Expertise</InputLabel>
                <Select
                  labelId="expertise-simple-select-label"
                  id="expertise-simple-select"
                  value={values?.expert_expertise}
                  label="Expertise"
                  onChange={handleSelectChange('expert_expertise')}
                  disabled
                >
                  { expertises.map((expertise: ExpertiseType, index: number) => 
                    <MenuItem value={expertise.code}>{expertise.label}</MenuItem>
                  )}
                </Select>
              </FormControl>
            )}
          </Grid>

          <Grid item xs={12} sx={{ mb: 3 }}>
              <Alert
                severity='warning'
                sx={{ '& a': { fontWeight: 400 } }}
              >
                <AlertTitle>You are not able to change this crucial info.</AlertTitle>
              </Alert>
          </Grid>

          {openAlert ? (
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Alert
                severity='warning'
                sx={{ '& a': { fontWeight: 400 } }}
                action={
                  <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
                    <Close fontSize='inherit' />
                  </IconButton>
                }
              >
                <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
                <Link href='/' onClick={(e: SyntheticEvent) => e.preventDefault()}>
                  Resend Confirmation
                </Link>
              </Alert>
            </Grid>
          ) : null}

          {/* <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>
            <Button type='reset' variant='outlined' color='secondary'>
              Reset
            </Button>
          </Grid> */}
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
