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
import { FormHelperText, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { ChangeEvent } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { TokenType } from 'src/utils/enums';
import { Control, Controller, FieldErrors, FieldValues, UseFormWatch } from 'react-hook-form';

interface MyCardProps {
  control: Control<HomeState, any>;
  errors: FieldErrors<HomeState>;
  watch: UseFormWatch<HomeState>;
  handleInitialSupplyChange: (newValue: string) => void;
  handleMaximumSupplyChange: (newValue: string) => void;
}

const SupplyCard = ({ control, errors, watch, handleInitialSupplyChange, handleMaximumSupplyChange }: MyCardProps) => {
  const theme = useTheme();
  const [network, token_type, supply_type, isTax] = watch(['network', 'token_type', 'supply_type', 'isTax']);

  return <>
    <CustomCard>
      <CustomCardContent>
        <CustomCardHeader>
          <TruckOutlineIcon className={'cardheader-icon'} />
          <Typography className={'cardheader-title'} variant='h4'>Supply</Typography>
        </CustomCardHeader>

        <Controller
          name="supply_type"
          control={control}
          rules={{ required: 'Supply Type is required' }}
          render={({ field, fieldState: { error } }) => (
            <CustomFormControl fullWidth>
              <Typography className={'control-title'} variant='caption'>SUPPLY TYPE*</Typography>
              <Select
                {...field}
                className={'control-element'}
                displayEmpty
                disabled={token_type === TokenType.Basic}
              >
                {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem> */}
                <MenuItem value={'Fixed'}>Fixed</MenuItem>
                <MenuItem value={'Capped'}>Capped</MenuItem>
                <MenuItem value={'Unlimited'} disabled={token_type < TokenType.Advance}>Unlimited</MenuItem>
              </Select>
              <FormHelperText className={'control-help'}>Fixed / Capped / Unlimited</FormHelperText>
            </CustomFormControl>
          )}
        />
        <Controller
          name="initial_supply"
          control={control}
          rules={{ required: 'Initial Supply is required' }}
          render={({ field, fieldState: { error } }) => (
            <CustomFormControl fullWidth>
              <Typography className={'control-title'} variant='caption'>INITIAL SUPPLY</Typography>
              <TextField
                className={'control-element'}
                {...field}
                error={!!error}
                onChange={(e) => {
                  field.onChange(e);
                  handleInitialSupplyChange(e.target.value);
                }}
                placeholder=""
                type="number"
                inputProps={{
                  min: 0,
                  pattern: "\\d*",
                }}
                disabled={token_type === TokenType.Basic}
              />
              <FormHelperText className={'control-help'}>The number of tokens minted during the creation of the contract</FormHelperText>
              {error && (<Typography variant={'caption'} color={'error'}>{error.message}</Typography>)}
            </CustomFormControl>
          )}
        />

        <Controller
          name="maximum_supply"
          control={control}
          rules={{ required: 'Maximum Supply is required' }}
          render={({ field, fieldState: { error } }) => (
            <CustomFormControl fullWidth
              sx={{ display: supply_type === 'Unlimited' ? 'none' : undefined }}>
              <Typography className={'control-title'} variant='caption'>MAXIMUM SUPPLY*</Typography>
              <TextField
                className={'control-element'}
                {...field}
                error={!!error}
                onChange={(e) => {
                  field.onChange(e);
                  handleMaximumSupplyChange(e.target.value);
                }}
                placeholder=""
                type="number"
                inputProps={{
                  pattern: "\\d*",
                }}
                disabled={supply_type === 'Fixed'}
              />
              <FormHelperText className={'control-help'}>The maximum number of tokens you can mint from the contract</FormHelperText>
              {error && (<Typography variant={'caption'} color={'error'}>{error.message}</Typography>)}
            </CustomFormControl>
          )}
        />



      </CustomCardContent>
    </CustomCard>
  </>
}

export default SupplyCard;