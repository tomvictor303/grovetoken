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
  values: HomeState;
  control: Control<HomeState, any>;
  errors: FieldErrors<HomeState>;
  watch: UseFormWatch<HomeState>;
  handleChange: (prop: keyof HomeState) => (event: ChangeEvent<HTMLInputElement>) => void
  handleSelectChange: (prop: keyof HomeState) => (event: SelectChangeEvent<any>) => void
  handleCheckedChange: (prop: keyof HomeState) => (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SupplyCard = ({ values, control, errors, watch, handleChange, handleSelectChange, handleCheckedChange}: MyCardProps) => {
  const theme = useTheme();
  const [ network, token_type, supply_type, isTax ] = watch(['network', 'token_type', 'supply_type', 'isTax']);

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
                disabled={token_type===TokenType.Basic}           
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

        <CustomFormControl fullWidth>
          <Typography className={'control-title'} variant='caption'>INITIAL SUPPLY</Typography>
          <TextField 
            className={'control-element'}
            value={values.initial_supply}
            onChange={handleChange('initial_supply')}
            placeholder=""
            type="number"
            inputProps={{
              min: 0,
              pattern: "\\d*",
            }}
            disabled={token_type===TokenType.Basic}
          />
          <FormHelperText className={'control-help'}>The number of coins minted during the creation of the contract</FormHelperText>
        </CustomFormControl>

        <CustomFormControl fullWidth 
            sx={{ display: supply_type==='Unlimited'?'none':undefined }}>
          <Typography className={'control-title'} variant='caption'>MAXIMUM SUPPLY*</Typography>
          <TextField 
            className={'control-element'}
            value={values.maximum_supply}
            onChange={handleChange('maximum_supply')}
            placeholder=""
            type="number"
            inputProps={{
              pattern: "\\d*",
            }}
            disabled={supply_type==='Fixed'}
          />
          <FormHelperText className={'control-help'}>The maximum number of coins you can mint from the contract</FormHelperText>
        </CustomFormControl>
      </CustomCardContent>
    </CustomCard>
  </>
}

export default SupplyCard;