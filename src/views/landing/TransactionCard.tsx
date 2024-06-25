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

interface MyCardProps {
  values: HomeState
  handleChange: (prop: keyof HomeState) => (event: ChangeEvent<HTMLInputElement>) => void
  handleSelectChange: (prop: keyof HomeState) => (event: SelectChangeEvent<any>) => void
  handleCheckedChange: (prop: keyof HomeState) => (event: React.ChangeEvent<HTMLInputElement>) => void
}

const TransactionCard = ({ values, handleChange, handleSelectChange, handleCheckedChange}: MyCardProps) => {
  const theme = useTheme();

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
            <Chip label="0.55 ETH" color="success" variant="filled" />
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