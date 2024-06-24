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
import { Autocomplete, Box, Checkbox, FormHelperText, InputAdornment, Link, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import { ChangeEvent } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import networks from 'src/utils/networks';

interface MyCardProps {
  values: HomeState
  handleChange: (prop: keyof HomeState) => (event: ChangeEvent<HTMLInputElement>) => void
  handleSelectChange: (prop: keyof HomeState) => (event: SelectChangeEvent<any>) => void
  handleCheckedChange: (prop: keyof HomeState) => (event: React.ChangeEvent<HTMLInputElement>) => void
  handleAutoCompleteChange: (prop: keyof HomeState) => (event: any, newValue: any) => void
}

const NetworkCard = ({ values, handleChange, handleSelectChange, handleCheckedChange, handleAutoCompleteChange}: MyCardProps) => {
  const theme = useTheme();

  return <>    
    <CustomCard>
      <CustomCardContent>
        <CustomCardHeader>
          <FountainPenTipIcon className={'cardheader-icon'} />
          <Typography className={'cardheader-title'} variant='h4'>Network</Typography>
        </CustomCardHeader>

        <CustomFormControl fullWidth>
          <Autocomplete
            className={'control-element'}
            options={networks}
            value={values.network}
            onChange={handleAutoCompleteChange('network')}
            autoHighlight
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                <img
                  loading="lazy"
                  width="20"
                  srcSet={`${option.icon} 2x`}
                  src={`${option.icon}`}
                  alt=""
                />
                {option.name}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: values?.network ? (
                    <InputAdornment position="start">
                      <img
                        loading="lazy"
                        width="20"
                        srcSet={`${values?.network.icon} 2x`}
                        src={`${values?.network.icon}`}
                        alt=""
                      />
                    </InputAdornment>
                  ) : null,
                }}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            )}
          />
          <FormHelperText className={'control-help'}>Select the network on which you want to deploy your token</FormHelperText>
        </CustomFormControl>
      </CustomCardContent>
    </CustomCard>
  </>
}

export default NetworkCard;