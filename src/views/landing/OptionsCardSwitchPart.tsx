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

const OptionsCardSwitchPart = ({ values, handleChange, handleSelectChange, handleCheckedChange}: MyCardProps) => {
  const theme = useTheme();

  return <>
    <Box>
      <CustomFormControl fullWidth>
        <Stack className={'control-element'} direction={'row'} alignItems={'center'} spacing={3}>
          <IOSSwitch 
            checked={values.isConformedERC20} onChange={handleCheckedChange('isConformedERC20')}
          />
          <Typography className={'control-switch-title'}>Conforms to ERC20 protocol</Typography>
        </Stack>
        <FormHelperText className={'control-help'}>Your token will const all the functionalities, and conforms to ERC20 protocol</FormHelperText>
      </CustomFormControl>

      <CustomFormControl fullWidth>
        <Stack className={'control-element'} direction={'row'} alignItems={'center'} spacing={3}>
          <IOSSwitch 
            checked={values.isVerifiedOnEtherscan} onChange={handleCheckedChange('isVerifiedOnEtherscan')}
          />
          <Typography className={'control-switch-title'}>Verified on Etherscan</Typography>
        </Stack>
        <FormHelperText className={'control-help'}>Your token will const all the functionalities, and conforms to ERC20 protocol</FormHelperText>
      </CustomFormControl>

      <CustomFormControl fullWidth>
        <Stack className={'control-element'} direction={'row'} alignItems={'center'} spacing={3}>
          <IOSSwitch 
            checked={values.isNoCopyrightLink} onChange={handleCheckedChange('isNoCopyrightLink')}
          />
          <Typography className={'control-switch-title'}>No copyright link</Typography>
        </Stack>
        <FormHelperText className={'control-help'}>A link pointing to this page will be added in the description of your contract (Free and Basic contracts only)</FormHelperText>
      </CustomFormControl>

      <CustomFormControl fullWidth>
        <Stack className={'control-element'} direction={'row'} alignItems={'center'} spacing={3}>
          <IOSSwitch 
            checked={values.isMintable} onChange={handleCheckedChange('isMintable')}
          />
          <Typography className={'control-switch-title'}>Mintable</Typography>
        </Stack>
        <FormHelperText className={'control-help'}>Allow the creation of new tokens in the future</FormHelperText>
      </CustomFormControl>

      <CustomFormControl fullWidth>
        <Stack className={'control-element'} direction={'row'} alignItems={'center'} spacing={3}>
          <IOSSwitch 
            checked={values.isBurnable} onChange={handleCheckedChange('isBurnable')}
          />
          <Typography className={'control-switch-title'}>Burnable</Typography>
        </Stack>
        <FormHelperText className={'control-help'}>Allow your tokens to be burned</FormHelperText>
      </CustomFormControl>

      <CustomFormControl fullWidth>
        <Stack className={'control-element'} direction={'row'} alignItems={'center'} spacing={3}>
          <IOSSwitch 
            checked={values.isPausable} onChange={handleCheckedChange('isPausable')}
          />
          <Typography className={'control-switch-title'}>Pausable</Typography>
        </Stack>
        <FormHelperText className={'control-help'}>Allow your tokens to be paused</FormHelperText>
      </CustomFormControl>

      <CustomFormControl fullWidth>
        <Stack className={'control-element'} direction={'row'} alignItems={'center'} spacing={3}>
          <IOSSwitch 
            checked={values.isRecoverable} onChange={handleCheckedChange('isRecoverable')}
          />
          <Typography className={'control-switch-title'}>Recoverable</Typography>
        </Stack>
        <FormHelperText className={'control-help'}>Allow to recover any ERC20 tokens sent to your contract</FormHelperText>
      </CustomFormControl>

      <CustomFormControl fullWidth>
        <Stack className={'control-element'} direction={'row'} alignItems={'center'} spacing={3}>
          <IOSSwitch 
            checked={values.isAntiWhale} onChange={handleCheckedChange('isAntiWhale')}
          />
          <Typography className={'control-switch-title'}>Anti Whale</Typography>
        </Stack>
        <FormHelperText className={'control-help'}>Add a tax on transactions.</FormHelperText>
      </CustomFormControl>

      <CustomFormControl fullWidth>
        <Stack className={'control-element'} direction={'row'} alignItems={'center'} spacing={3}>
          <IOSSwitch 
            checked={values.isTax} onChange={handleCheckedChange('isTax')}
          />
          <Typography className={'control-switch-title'}>Tax</Typography>
        </Stack>
        <FormHelperText className={'control-help'}>Add a tax on transactions.</FormHelperText>
      </CustomFormControl>
    </Box>
  </>
}

export default OptionsCardSwitchPart;