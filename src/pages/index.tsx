// ** MUI Imports
import Grid from '@mui/material/Grid'

import { styled, useTheme } from '@mui/material/styles';

// ** LandingPage Components Imports
import TopExperts from 'src/views/landing/TopExperts'

// ** Demo Components Imports
import LawyersCategory from 'src/views/landing/LawyersCategory'
import DoctorsCategory from 'src/views/landing/DoctorsCategory'
import ExerciseCategory from 'src/views/landing/ExerciseCategory'
import { Badge, Box, Button, Card, CardContent, CardHeader, Checkbox, Chip, FormControl, FormHelperText, Link, MenuItem, Paper, Select, SelectChangeEvent, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { 
  MonitorShimmer as MonitorShimmerIcon,
  TruckOutline as TruckOutlineIcon,
  Tune as TuneIcon,
  Lan as LanIcon,
  FountainPenTip as FountainPenTipIcon,
  WindowShutterSettings as WindowShutterSettingsIcon,
  InformationOutline as InformationOutlineIcon,
} from 'mdi-material-ui'
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
  token_type: number
  token_name: string
  token_symbol: string
  token_decimals: number
}

const LandingPage = () => {
  const theme = useTheme();
  const block_spacing = 6;

  // ** States
  const [values, setValues] = useState<State>({
    token_type: 0,
    token_name: '',
    token_symbol: '',
    token_decimals: 18,
  })

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleSelectChange = (prop: keyof State) => (event: SelectChangeEvent<any>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  return (
    <Grid container spacing={block_spacing}>
      <Grid item xs={12}>
        <Box textAlign={'center'} py={15}>
          <Typography variant='h2' mb={4} style={{color: theme.palette.customColors.semiwhite}}>Create your Token on <span style={{ color: theme.palette.success.main }}>Ethereum</span></Typography>
          <Typography variant='h5'>Easily deploy your Smart Contract for a Standard, Capped, Mintable, Burnable ERC20 Token.</Typography>
          <Typography variant='h5'>No login. No setup. No coding required.</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Stack spacing={block_spacing}>
          {/** BEGIN Informations_card */}
          <CustomCard>
            <CustomCardContent>
              <CustomCardHeader>
                <MonitorShimmerIcon className={'cardheader-icon'} />
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
                  {/* <MenuItem value="">
                    <em>None</em>
                  </MenuItem> */}
                  <MenuItem value={0}>Free</MenuItem>
                  <MenuItem value={1}>Basic</MenuItem>
                  <MenuItem value={2}>Custom</MenuItem>
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
                />
                <FormHelperText className={'control-help'}>The name of your token</FormHelperText>
              </CustomFormControl>

              <CustomFormControl fullWidth>
                <Typography className={'control-title'} variant='caption'>TOKEN SYMBOL*</Typography>
                <TextField 
                  className={'control-element'}
                  value={values.token_symbol}
                  onChange={handleChange('token_symbol')}
                  placeholder="TKN"           
                />
                <FormHelperText className={'control-help'}>Your token's symbol (e.g ETH)</FormHelperText>
              </CustomFormControl>            

              <CustomFormControl fullWidth>
                <Typography className={'control-title'} variant='caption'>DECIMALS*</Typography>
                <TextField 
                  className={'control-element'}
                  value={values.token_decimals}
                  onChange={handleChange('token_decimals')}
                  placeholder=""
                  type="number"
                  inputProps={{
                    min: 1,
                    max: 18,
                    pattern: "\\d*",
                  }}
                />
                <FormHelperText className={'control-help'}>The number of decimal of your token (default 18)</FormHelperText>
              </CustomFormControl>
            </CustomCardContent>
          </CustomCard>
          {/** END Informations_card */}

          {/** BEGIN Supply_card */}
          <CustomCard>
            <CustomCardContent>
              <CustomCardHeader>
                <TruckOutlineIcon className={'cardheader-icon'} />
                <Typography className={'cardheader-title'} variant='h4'>Supply</Typography>
              </CustomCardHeader>
            </CustomCardContent>
          </CustomCard>
          {/** END Supply_card */}
        </Stack>
      </Grid>

      <Grid item xs={12} md={4}>
        <Stack spacing={block_spacing}>
          {/** BEGIN Options_card */}
          <CustomCard>
            <CustomCardContent>
              <CustomCardHeader>
                <TuneIcon className={'cardheader-icon'} />
                <Typography className={'cardheader-title'} variant='h4'>Options</Typography>
              </CustomCardHeader>
            </CustomCardContent>
          </CustomCard>
          {/** END Options_card */}
        </Stack>
      </Grid>

      <Grid item xs={12} md={4}>
        <Stack spacing={block_spacing}>
          {/** BEGIN Network_card */}
          <CustomCard>
            <CustomCardContent>
              <CustomCardHeader>
                <LanIcon className={'cardheader-icon'} />
                <Typography className={'cardheader-title'} variant='h4'>Network</Typography>
              </CustomCardHeader>
            </CustomCardContent>
          </CustomCard>
          {/** END Network_card */}
          
          {/** BEGIN Agreement_card */}
          <CustomCard>
            <CustomCardContent>
              <CustomCardHeader>
                <FountainPenTipIcon className={'cardheader-icon'} />
                <Typography className={'cardheader-title'} variant='h4'>Agreement</Typography>
              </CustomCardHeader>

              <CustomFormControl fullWidth>
                <Stack direction={'row'} alignItems={'flex-start'} spacing={1}>
                  <Checkbox color="success" />
                  <Typography>
                    I have read, understood and agreed to the <Link className='cursorPoint' style={{ display: 'inline', color: theme.palette.success.main, textDecoration: 'underline'}}>Terms of Use</Link>.
                  </Typography>
                </Stack>
              </CustomFormControl>
            </CustomCardContent>
          </CustomCard>
          {/** END Agreement_card */}
          
          {/** BEGIN Transaction_card */}
          <CustomCard>
            <CustomCardContent>
              <CustomCardHeader>
                <WindowShutterSettingsIcon className={'cardheader-icon'} />
                <Typography className={'cardheader-title'} variant='h4'>Transaction</Typography>
              </CustomCardHeader>

              <CustomFormControl fullWidth>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} spacing={1}>
                    <Typography>Commission Fee:</Typography>
                    <Tooltip title="Commission Fee that you need to create token" className='cursorPoint'>
                      <InformationOutlineIcon className='extra-small-icon' color='success' />
                    </Tooltip>
                  </Stack>
                  <Chip label="0.55 ETH" color="success" variant="filled" />
                </Stack>
              </CustomFormControl>

              <CustomFormControl fullWidth>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} spacing={1}>
                    <Typography>Gas Fee:</Typography>
                    <Tooltip title="Gas Fee will be consumed during network" className='cursorPoint'>
                      <InformationOutlineIcon className='extra-small-icon' color='success' />
                    </Tooltip>
                  </Stack>
                  <Chip label="Variable" color="primary" variant="filled" />
                </Stack>
              </CustomFormControl>
            </CustomCardContent>
          </CustomCard>
          {/** END Transaction_card */}
          
          {/** BEGIN confirm_button */}
          <Box>            
            <Button variant="contained" fullWidth color="success">Confirm</Button>
          </Box>
          {/** END confirm_button */}
        </Stack>
      </Grid>
    </Grid>
  )
}

export default LandingPage
