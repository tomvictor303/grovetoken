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
import { TokenType } from 'src/utils/enums';
import { Control, FieldErrors } from 'react-hook-form';

interface MyCardProps {
  values: HomeState;
  control: Control<HomeState, any>;
  errors: FieldErrors<HomeState>;
  handleChange: (prop: keyof HomeState) => (event: ChangeEvent<HTMLInputElement>) => void
  handleSelectChange: (prop: keyof HomeState) => (event: SelectChangeEvent<any>) => void
  handleCheckedChange: (prop: keyof HomeState) => (event: React.ChangeEvent<HTMLInputElement>) => void
}

const OptionsCardFinalPart = ({ values, control, errors, handleChange, handleSelectChange, handleCheckedChange}: MyCardProps) => {
  const theme = useTheme();

  return <>
    <Box>
      <CustomFormControl fullWidth>
        <Typography className={'control-title'} variant='caption'>ROUTER</Typography>
        <Select 
          className={'control-element'}
          value={values.swap_router}
          onChange={handleSelectChange('swap_router')}
          displayEmpty           
        >
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
          <MenuItem value={'uniswap_router_v2'}>Uniswap Router V2</MenuItem>
          <MenuItem value={'pancakeswap_router_v2'}>Pancakeswap Router V2</MenuItem>
        </Select>
        <FormHelperText className={'control-help'}>Select the swap router to use</FormHelperText>
      </CustomFormControl>

      <CustomFormControl fullWidth>
        <Typography className={'control-title'} variant='caption'>ACCESS TYPE*</Typography>
        <Select 
          className={'control-element'}
          value={values.access_type}
          onChange={handleSelectChange('access_type')}
          displayEmpty 
          disabled={values?.token_type!==TokenType.Advance}           
        >
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
          <MenuItem value={'Owner'}>Owner</MenuItem>
          <MenuItem value={'Admin'}>Admin</MenuItem>
        </Select>
        <FormHelperText className={'control-help'}>Who can administer your contract</FormHelperText>
      </CustomFormControl>

      <CustomFormControl fullWidth>
        <Typography variant='caption'>
          <span style={{color: theme.palette.success.main}}>Owner:</span> Your wallet address will be set as the owner of your token to perform administrative tasks (ie, mint new tokens).
        </Typography>
      </CustomFormControl>

      <CustomFormControl fullWidth>
        <Typography variant='caption'>
          <span style={{color: theme.palette.success.main}}>Roles:</span> All admin tasks (mint, burn, etc...) will be available to different users, based on their roles. By default, your wallet's address will be given all the roles.
        </Typography>
      </CustomFormControl>
    </Box>
  </>
}

export default OptionsCardFinalPart;