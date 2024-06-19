// ** MUI Imports
import Grid from '@mui/material/Grid'

import { styled, useTheme } from '@mui/material/styles';

// ** LandingPage Components Imports
import TopExperts from 'src/views/landing/TopExperts'

// ** Demo Components Imports
import LawyersCategory from 'src/views/landing/LawyersCategory'
import DoctorsCategory from 'src/views/landing/DoctorsCategory'
import ExerciseCategory from 'src/views/landing/ExerciseCategory'
import { Box, Card, CardContent, CardHeader, FormControl, FormHelperText, MenuItem, Paper, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material'
import MonitorShimmer from 'mdi-material-ui/MonitorShimmer'
import { BorderRadius } from 'mdi-material-ui';
import { ChangeEvent, useState } from 'react';

const CustomCard = styled(Card)(({ theme }) => ({
  // borderRadius: theme.shape.borderRadius * 2,
}));

const CustomCardContent = styled(CardContent)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
}));

const CustomCardHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(5),

  '& .cardheader-icon': {
    color: theme.palette.success.main,
  },
  '& .cardheader-title': {
    color: theme.palette.customColors.semiwhite,
  },
}));

const CustomFormControl = styled(FormControl)(({ theme }) => ({
  marginBottom: theme.spacing(7),
  '& .control-title': {
    color: theme.palette.secondary.main,
    fontWeight: 700,
    marginBottom: theme.spacing(2),
  },
  '& .control-element': {
    marginBottom: theme.spacing(2),
  },
  '& .control-element .MuiOutlinedInput-input': {
    color: theme.palette.customColors.semiwhite, // style for inputed text
    paddingTop: '12px',
    paddingBottom: '12px',
    borderWidth: '5px',
  },
  '& .control-element fieldset': {
    borderWidth: '2px',
    borderColor: '#777E90'
  },
  '& .control-help': {
    margin: 0,
  },
})); 

interface State {
  token_type: string
  token_name: string
  token_symbol: string
  decimals: number
}

const LandingPage = () => {
  const theme = useTheme();

  // ** States
  const [values, setValues] = useState<State>({
    token_type: '',
    token_name: '',
    token_symbol: '',
    decimals: 18,
  })

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleSelectChange = (prop: keyof State) => (event: SelectChangeEvent<any>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box textAlign={'center'} py={15}>
          <Typography variant='h2' mb={4} style={{color: theme.palette.customColors.semiwhite}}>Create your Token on <span style={{ color: theme.palette.success.main }}>Ethereum</span></Typography>
          <Typography variant='h5'>Easily deploy your Smart Contract for a Standard, Capped, Mintable, Burnable ERC20 Token.</Typography>
          <Typography variant='h5'>No login. No setup. No coding required.</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        {/** BEGIN Informations_card */}
        <CustomCard>            
          <CustomCardContent>
            <CustomCardHeader>
              <MonitorShimmer className={'cardheader-icon'} />
              <Typography className={'cardheader-title'} variant='h4'>Informations</Typography>
            </CustomCardHeader>

            <CustomFormControl fullWidth>
              <Typography className={'control-title'} variant='caption'>TOKEN TYPE*</Typography>
              <Select 
                className={'control-element'}
                // value={age}
                // onChange={handleChange}
                value={values.token_type}
                onChange={handleSelectChange('token_type')}
                displayEmpty           
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Free</MenuItem>
                <MenuItem value={20}>Basic</MenuItem>
                <MenuItem value={30}>Custom</MenuItem>
              </Select>
              <FormHelperText className={'control-help'}>Select the base configuration of your token (Free and Basic have limited configurations)</FormHelperText>
            </CustomFormControl>

            <CustomFormControl fullWidth>
              <Typography className={'control-title'} variant='caption'>TOKEN NAME*</Typography>
              <TextField 
                className={'control-element'}
                value={values.token_name}
                onChange={handleChange('token_name')}
                placeholder="My new token name"
                defaultValue="Hello World"           
              />
              <FormHelperText className={'control-help'}>The name of your token</FormHelperText>
            </CustomFormControl>
          </CustomCardContent>
        </CustomCard>
        {/** END Informations_card */}
      </Grid>
      <Grid item xs={12} md={4}>
        <DoctorsCategory />
      </Grid>
      <Grid item xs={12} md={4}>
        <ExerciseCategory />
      </Grid>
    </Grid>
  )
}

export default LandingPage
