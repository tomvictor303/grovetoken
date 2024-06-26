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
import { Checkbox, Chip, FormHelperText, Link, MenuItem, Select, SelectChangeEvent, Stack, TextField, Tooltip, Typography } from '@mui/material';
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

const TransactionCard = ({ values, control, errors, watch, handleChange, handleSelectChange, handleCheckedChange}: MyCardProps) => {
  const theme = useTheme();
  const [ network, token_type, supply_type, isTax ] = watch(['network', 'token_type', 'supply_type', 'isTax']);
  // BEGIN commision_fee_issue
  let commision_fee: number = 0.1;
  if (values.network?.commission_fee) {
    if (values.token_type === TokenType.Basic) {
      commision_fee = values.network?.commission_fee.basic;
    }
    if (values.token_type === TokenType.Custom) {
      commision_fee = values.network?.commission_fee.custom;
    }
    if (values.token_type === TokenType.Advance) {
      commision_fee = values.network?.commission_fee.advance;
    }
  } // END commision_fee_issue

  return <>    
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
              <Tooltip title="Commission Fee is the cost that Grove charges to create the asset" className='cursorPoint'>
                <InformationOutlineIcon className='extra-small-icon' color='success' />
              </Tooltip>
            </Stack>
            <Chip label={`${Number(commision_fee).toLocaleString('en')} ${values.network?.currency}`} color="success" variant="filled" />
          </Stack>
        </CustomFormControl>

        <CustomFormControl fullWidth>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} spacing={1}>
              <Typography>Gas Fee:</Typography>
              <Tooltip title="Gas Fee is the cost of sending a transaction on the blockchain network" className='cursorPoint'>
                <InformationOutlineIcon className='extra-small-icon' color='success' />
              </Tooltip>
            </Stack>
            <Chip label="Variable" color="warning" variant="filled" sx={{backgroundColor: 'rgb(251,116,34)'}}/>
          </Stack>
        </CustomFormControl>
      </CustomCardContent>
    </CustomCard>
  </>
}

export default TransactionCard;