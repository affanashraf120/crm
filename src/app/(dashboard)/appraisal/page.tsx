// Mui imports
import { Grid } from '@mui/material'

// import Custom Components
import AppraisalClientCard from '@/views/app/clients/Card'
import AppraisalClientTable from '@/views/app/clients/Table'

function App() {
  return (
    <div className='App'>
      <Grid container spacing={6} style={{ cursor: 'pointer' }}>
        <Grid item xs={12}>
          <AppraisalClientCard />
        </Grid>

        <Grid item xs={12}>
          <AppraisalClientTable />
        </Grid>
      </Grid>
    </div>
  )
}

export default App
