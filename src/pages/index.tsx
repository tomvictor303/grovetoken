// ** MUI Imports
import Grid from '@mui/material/Grid'

import { useTheme } from '@mui/material/styles';

// ** LandingPage Components Imports
import TopExperts from 'src/views/landing/TopExperts'

// ** Demo Components Imports
import LawyersCategory from 'src/views/landing/LawyersCategory'
import DoctorsCategory from 'src/views/landing/DoctorsCategory'
import ExerciseCategory from 'src/views/landing/ExerciseCategory'
import { Stack, Typography } from '@mui/material'

const LandingPage = () => {
  const theme = useTheme();

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Stack 
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Typography variant='h2' mb={14}>Create your Token on <span style={{ color: theme.palette.success.main }}>Ethereum</span></Typography>
          <Typography variant='h5'>Easily deploy your Smart Contract for a Standard, Capped, Mintable, Burnable ERC20 Token.</Typography>
          <Typography variant='h5'>No login. No setup. No coding required.</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12} md={4}>
        <LawyersCategory />
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
