// ** MUI Imports
import Grid from '@mui/material/Grid'

import { styled, useTheme } from '@mui/material/styles';

// ** LandingPage Components Imports
import TopExperts from 'src/views/landing/TopExperts'

// ** Demo Components Imports
import LawyersCategory from 'src/views/landing/LawyersCategory'
import DoctorsCategory from 'src/views/landing/DoctorsCategory'
import ExerciseCategory from 'src/views/landing/ExerciseCategory'
import { Box, Card, CardContent, CardHeader, FormControl, FormHelperText, MenuItem, Paper, Select, Stack, Typography } from '@mui/material'
import MonitorShimmer from 'mdi-material-ui/MonitorShimmer'

const CustomCardHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(5),
}));



  

const LandingPage = () => {
  const theme = useTheme();

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box textAlign={'center'} py={15}>
          <Typography variant='h2' mb={4} style={{color: theme.palette.customColors.semiwhite}}>Create your Token on <span style={{ color: theme.palette.success.main }}>Ethereum</span></Typography>
          <Typography variant='h5'>Easily deploy your Smart Contract for a Standard, Capped, Mintable, Burnable ERC20 Token.</Typography>
          <Typography variant='h5'>No login. No setup. No coding required.</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        {/** BEGIN Informations_card */}
        <Card>
          <CardContent>
            <CustomCardHeader>
              <MonitorShimmer fontSize={'large'} color={`success`}/>
              <Typography variant='h4' color={`customColors.semiwhite`}>Informations</Typography>
            </CustomCardHeader>
            <FormControl fullWidth>
              <Select
                // value={age}
                // onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <FormHelperText>Without label</FormHelperText>
            </FormControl>
          </CardContent>
        </Card>
        {/** END Informations_card */}
      </Grid>
      <Grid item xs={12} md={4}>
        <DoctorsCategory />
      </Grid>
      <Grid item xs={12} md={4}>
        <ExerciseCategory />
      </Grid>
    </Grid>
  )
}

export default LandingPage
