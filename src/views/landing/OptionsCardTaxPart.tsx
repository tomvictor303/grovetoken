import { CustomCard, CustomCardContent, CustomCardHeader, CustomFormControl } from 'src/views/custom/CustomCard';
import { 
  MonitorShimmer as MonitorShimmerIcon,
  TruckOutline as TruckOutlineIcon,
  Tune as TuneIcon,
  Lan as LanIcon,
  FountainPenTip as FountainPenTipIcon,
  WindowShutterSettings as WindowShutterSettingsIcon,
  InformationOutline as InformationOutlineIcon,
  PlusCircleOutline as PlusCircleOutlineIcon,
} from 'mdi-material-ui'
import { Box, Button, FormHelperText, Grid, InputAdornment, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { ChangeEvent } from 'react';
import IOSSwitch from '../custom/IOSSwitch';
import { styled, useTheme } from '@mui/material/styles';

interface MyCardProps {
  values: HomeState
  handleChange: (prop: keyof HomeState) => (event: ChangeEvent<HTMLInputElement>) => void
  handleSelectChange: (prop: keyof HomeState) => (event: SelectChangeEvent<any>) => void
  handleCheckedChange: (prop: keyof HomeState) => (event: React.ChangeEvent<HTMLInputElement>) => void
}

const OptionsCardTaxPart = ({ values, handleChange, handleSelectChange, handleCheckedChange}: MyCardProps) => {
  const theme = useTheme();

  return <>
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <CustomFormControl fullWidth>
            <Typography className={'control-title'} variant='caption'>
              <Stack direction={'row'} alignItems={'center'} spacing={1}>
                <Box>BURN</Box>
                <Tooltip title="Reduces total supply in real time as people transact the token, increasing rarity" className='cursorPoint'>
                  <InformationOutlineIcon className='extra-small-icon' color='success' />
                </Tooltip>
              </Stack>
            </Typography>
            <OutlinedInput 
              className={'control-element'}
              value={values.burnPercent}
              onChange={handleChange('burnPercent')}
              placeholder=""
              type="number"
              inputProps={{
                min: 0,
                max: 100,
                pattern: "\\d*",
              }}
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
            />
          </CustomFormControl>
        </Grid>
        <Grid item xs={6}>                    
          <CustomFormControl fullWidth>                      
            <Typography className={'control-title'} variant='caption'>
              <Stack direction={'row'} alignItems={'center'} spacing={1}>
                <Box>Marketing</Box>
                <Tooltip title="Route a percentage of taxes to your team wallets as people transact the token" className='cursorPoint'>
                  <InformationOutlineIcon className='extra-small-icon' color='success' />
                </Tooltip>
              </Stack>
            </Typography>
            <OutlinedInput 
              className={'control-element'}
              value={values.teamPercent}
              onChange={handleChange('teamPercent')}
              placeholder=""
              type="number"
              inputProps={{
                min: 0,
                max: 100,
                pattern: "\\d*",
              }}
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
            />
          </CustomFormControl>
        </Grid>
      </Grid>

      <CustomFormControl fullWidth>
        <Typography variant='caption' align='center' color={theme.palette.customColors.semiwhite}>Breakdown of Taxes</Typography>
      </CustomFormControl>

      {/** BEGIN TEAM_ADDRESS_block_in_Options_card_tax_part*/}       
      <Box marginBottom={4}>
        <Typography className={'control-title'} variant='caption'>
          <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <Box>TEAM ADDRESS</Box>
            <Tooltip title="Specify which addresses should receive a percentage of the Team Tax Alloction" className='cursorPoint'>
              <InformationOutlineIcon className='extra-small-icon' color='success' />
            </Tooltip>
          </Stack>
        </Typography>
        
        {/** address list*/}
        <Box>
        </Box>

        {/** Add new button */}
        <Box>
          <Button variant='text' color='success'>
            <PlusCircleOutlineIcon/>&nbsp;&nbsp;
            <Typography variant='body2' style={{ display: 'inline', color: theme.palette.success.main, textDecoration: 'underline'}}>Add a new address</Typography>
          </Button>
        </Box>
      </Box>
      {/** END TEAM_ADDRESS_block_in_Options_card_tax_part */}

      <CustomFormControl fullWidth>
        <Select 
          className={'control-element'}
          value={values.taxCurrency}
          onChange={handleSelectChange('taxCurrency')}
          displayEmpty           
        >
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
          <MenuItem value={'eth'}>Send tax in ETH</MenuItem>
          <MenuItem value={'token'}>Send tax in Token</MenuItem>
        </Select>
        <FormHelperText className={'control-help'}>
          Select the currency to send to the team (ETH or tokens). The tax will be swapped if ETH is selected.
        </FormHelperText>
      </CustomFormControl>
    </Box>
  </>
}

export default OptionsCardTaxPart;