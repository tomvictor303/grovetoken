// ** MUI Imports
import { Box } from '@mui/material'
import ExpertDashboardQuestionsTable from 'src/views/dashboard/expert/ExpertDashboardQuestionTable'

const ExpertDashboard = () => {
    // ** States
  return (<>
    <Box maxWidth={'1200px'} style={{margin: '0 auto'}}>
      <ExpertDashboardQuestionsTable />
    </Box>
  </>)
}

export default ExpertDashboard
