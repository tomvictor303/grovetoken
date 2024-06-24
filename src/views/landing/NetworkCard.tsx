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
import { ChangeEvent } from 'react';
import { styled, useTheme } from '@mui/material/styles';

interface MyCardProps {
  values: HomeState
  handleChange: (prop: keyof HomeState) => (event: ChangeEvent<HTMLInputElement>) => void
  handleSelectChange: (prop: keyof HomeState) => (event: SelectChangeEvent<any>) => void
  handleCheckedChange: (prop: keyof HomeState) => (event: React.ChangeEvent<HTMLInputElement>) => void
}

const NetworkCard = ({ values, handleChange, handleSelectChange, handleCheckedChange}: MyCardProps) => {
  const theme = useTheme();

  return <>    
    <CustomCard>
      <CustomCardContent>
        <CustomCardHeader>
          <FountainPenTipIcon className={'cardheader-icon'} />
          <Typography className={'cardheader-title'} variant='h4'>Network</Typography>
        </CustomCardHeader>

        <CustomFormControl fullWidth>
          <Stack direction={'row'} alignItems={'flex-start'} spacing={1}>
            <Checkbox color="success" />
            <Typography>
              I have read, understood and agreed to the <Link className='cursorPoint' style={{ display: 'inline', color: theme.palette.success.main, textDecoration: 'underline'}}>Terms of Use</Link>.
            </Typography>
          </Stack>
        </CustomFormControl>
      </CustomCardContent>
    </CustomCard>
  </>
}

export default NetworkCard;