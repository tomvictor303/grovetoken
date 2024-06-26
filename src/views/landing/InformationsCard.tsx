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
  control: Control<HomeState, any>,
  errors: FieldErrors<HomeState>,
  watch: UseFormWatch<HomeState>,
}

const InformationsCard = ({ control, errors,  watch }: MyCardProps) => {
  const theme = useTheme();
  const [ token_type ] = watch(['token_type']);

  return <>
    <CustomCard>
      <CustomCardContent>
        <CustomCardHeader>
          <MonitorShimmerIcon className={'cardheader-icon'} />
          <Typography className={'cardheader-title'} variant='h4'>Informations</Typography>
        </CustomCardHeader>

        <Controller
          name="token_type"
          control={control}
          rules={{ required: 'Token Type is required' }}
          render={({ field, fieldState: { error } }) => (
            <CustomFormControl fullWidth>
              <Typography className={'control-title'} variant='caption'>TOKEN TYPE*</Typography>
              <Select
                {...field} 
                className={'control-element'}
                displayEmpty           
              >
                {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem> */}
                <MenuItem value={0}>Basic</MenuItem>
                <MenuItem value={1}>Custom</MenuItem>
                <MenuItem value={2}>Advance</MenuItem>
              </Select>
              <FormHelperText className={'control-help'}>
                {field.value === TokenType.Basic && ("Basic Type configuration has limited options.")}
                {field.value === TokenType.Custom && ("Custom Type configuration has selective options.")}
                {field.value === TokenType.Advance && ("Advance Type configuration with industry best features.")}
              </FormHelperText>
            </CustomFormControl>
          )}
        />
        
        <Controller
          name="token_name"
          control={control}
          defaultValue=""
          rules={{ required: 'Token Name is required' }}
          render={({ field }) => (
            <CustomFormControl fullWidth>
              <Typography className={'control-title'} variant='caption'>TOKEN NAME*</Typography>
              <TextField
                {...field}
                error={!!errors.token_name}
                className={'control-element'}
                placeholder="My new token name"           
              />
              <FormHelperText className={'control-help'}>The name of your token</FormHelperText>
              {errors.token_name && (<Typography variant={'caption'} color={'error'}>{errors.token_name.message}</Typography>)}
            </CustomFormControl>
          )}
        />

        <Controller
          name="token_symbol"
          control={control}
          defaultValue=""
          rules={{ required: 'Token Symbol is required' }}
          render={({ field }) => (            
            <CustomFormControl fullWidth>
              <Typography className={'control-title'} variant='caption'>TOKEN SYMBOL*</Typography>
              <TextField
                {...field}
                error={!!errors.token_symbol}
                className={'control-element'}
                placeholder="TKN"           
              />
              <FormHelperText className={'control-help'}>Your token's symbol (e.g ETH)</FormHelperText>
              {errors.token_symbol && (<Typography variant={'caption'} color={'error'}>{errors.token_symbol.message}</Typography>)}
            </CustomFormControl>
          )}
        />            

        <Controller
          name="token_decimals"
          control={control}
          defaultValue={18}
          rules={{ required: 'Token decimal is required' }}
          render={({ field }) => (            
            <CustomFormControl fullWidth>
              <Typography className={'control-title'} variant='caption'>DECIMALS*</Typography>
              <TextField 
                className={'control-element'}
                {...field}
                error={!!errors.token_decimals}
                placeholder=""
                type="number"
                disabled={token_type < TokenType.Advance}
                inputProps={{
                  min: 1,
                  max: 18,
                  pattern: "\\d*",
                }}
              />
              <FormHelperText className={'control-help'}>The number of decimal of your token (default 18)</FormHelperText>
              {errors.token_decimals && (<Typography variant={'caption'} color={'error'}>{errors.token_decimals.message}</Typography>)}
            </CustomFormControl>
          )}
        />
      </CustomCardContent>
    </CustomCard>
  </>
}

export default InformationsCard;