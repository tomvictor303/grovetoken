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

interface MyCardProps {
  values: HomeState
  handleChange: (prop: keyof HomeState) => (event: ChangeEvent<HTMLInputElement>) => void
  handleSelectChange: (prop: keyof HomeState) => (event: SelectChangeEvent<any>) => void
  handleCheckedChange: (prop: keyof HomeState) => (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InformationsCard = ({ values, handleChange, handleSelectChange, handleCheckedChange}: MyCardProps) => {
  const theme = useTheme();

  return <>
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
            value={values.token_type}
            onChange={handleSelectChange('token_type')}
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
            {values.token_type === TokenType.Basic && ("Basic Type configuration has limited options.")}
            {values.token_type === TokenType.Custom && ("Custom Type configuration has selective options.")}
            {values.token_type === TokenType.Advance && ("Advance Type configuration with industry best features.")}
          </FormHelperText>
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
            disabled={values.token_type < TokenType.Advance}
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
  </>
}

export default InformationsCard;