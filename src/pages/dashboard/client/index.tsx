// ** MUI Imports
import { Box } from '@mui/material'
import ClientDashboardQuestionsTable from 'src/views/dashboard/client/ClientDashboardQuestionsTable';

const ClientDashboard = () => {
    // ** States
  return (<>
    <Box maxWidth={'1200px'} style={{margin: '0 auto'}}>
      <ClientDashboardQuestionsTable />
    </Box>
  </>)
}

export default ClientDashboard
