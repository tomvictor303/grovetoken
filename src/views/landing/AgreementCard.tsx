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
import { Checkbox, FormHelperText, Link, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import TermsOfServiceDialog from './TermsOfServiceDialog';
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

const AgreementCard = ({ values, control, errors, watch, handleChange, handleSelectChange, handleCheckedChange}: MyCardProps) => {
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);

  return <>    
    <CustomCard>
      <CustomCardContent>
        <CustomCardHeader>
          <FountainPenTipIcon className={'cardheader-icon'} />
          <Typography className={'cardheader-title'} variant='h4'>Agreement</Typography>
        </CustomCardHeader>

        <CustomFormControl fullWidth>
          <Stack direction={'row'} alignItems={'flex-start'} spacing={1}>
            <Checkbox color="success" />
            <Typography>
              I have read, understood and agreed to the <Link onClick={()=>{setOpen(true);}} className='cursorPoint' style={{ display: 'inline', color: theme.palette.success.main, textDecoration: 'underline'}}>Terms of Use</Link>.
            </Typography>
          </Stack>
        </CustomFormControl>
      </CustomCardContent>
    </CustomCard>

    <TermsOfServiceDialog open={open} onClose={()=>{setOpen(false);}}/>
  </>
}

export default AgreementCard;