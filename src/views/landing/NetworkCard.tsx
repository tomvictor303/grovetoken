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
import { Control, Controller, FieldErrors, FieldValues, UseFormWatch } from 'react-hook-form';

interface MyCardProps {
  values: HomeState;
  control: Control<HomeState, any>;
  errors: FieldErrors<HomeState>;
  watch: UseFormWatch<HomeState>;
  handleChange: (prop: keyof HomeState) => (event: ChangeEvent<HTMLInputElement>) => void
  handleSelectChange: (prop: keyof HomeState) => (event: SelectChangeEvent<any>) => void
  handleCheckedChange: (prop: keyof HomeState) => (event: React.ChangeEvent<HTMLInputElement>) => void
  handleAutoCompleteChange: (prop: keyof HomeState) => (event: any, newValue: any) => void
}

const NetworkCard = ({ values, control, errors,  watch, handleChange, handleSelectChange, handleCheckedChange, handleAutoCompleteChange}: MyCardProps) => {
  const theme = useTheme();

  return <>    
    <CustomCard>
      <CustomCardContent>
        <CustomCardHeader>
          <FountainPenTipIcon className={'cardheader-icon'} />
          <Typography className={'cardheader-title'} variant='h4'>Network</Typography>
        </CustomCardHeader>

        <Controller
          name="network"
          control={control}
          rules={{ required: 'Network is required' }}
          render={({ field, fieldState: { error } }) => (
            <CustomFormControl fullWidth>
              <Autocomplete
                className={'control-element'}                
                {...field}
                options={networks}
                autoHighlight
                getOptionLabel={(option) => option.name}
                onChange={(_, newValue) => field.onChange(newValue)}
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
                    error={!!errors.network}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: field.value ? (
                        <InputAdornment position="start">
                          <img
                            loading="lazy"
                            width="20"
                            srcSet={`${field.value.icon} 2x`}
                            src={`${field.value.icon}`}
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
              {errors.network && (<Typography variant={'caption'} color={'error'}>{errors.network.message}</Typography>)}
            </CustomFormControl>
          )}
        />

      </CustomCardContent>
    </CustomCard>
  </>
}

export default NetworkCard;