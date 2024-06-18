// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** LandingPage Components Imports
import TopExperts from 'src/views/landing/TopExperts'

// ** Demo Components Imports
import LawyersCategory from 'src/views/landing/LawyersCategory'
import DoctorsCategory from 'src/views/landing/DoctorsCategory'
import ExerciseCategory from 'src/views/landing/ExerciseCategory'

const LandingPage = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <TopExperts />
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
    </ApexChartWrapper>
  )
}

export default LandingPage
