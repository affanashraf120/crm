// Mui imports
import { Grid } from '@mui/material'

// import Custom Components
import AppraisalClientCard from '@/views/app/appraisalClient/Card'
import AppraisalClientTable from '@/views/app/appraisalClient/Table'

// Vars
const data = [
  {
    title: 24,
    subtitle: 'Clients',
    icon: 'ri-user-3-line'
  },
  {
    title: 165,
    subtitle: 'Open Appraisals',
    icon: 'ri-file-text-line'
  },
  {
    title: '26',
    subtitle: 'Closed Appraisals',
    icon: 'ri-file-check-line'
  },
  {
    title: '$876',
    subtitle: 'Revenue',
    icon: 'ri-money-dollar-circle-line'
  }
]

function App() {
  return (
    <div className='App'>
      <Grid container spacing={6} style={{ cursor: 'pointer' }}>
        <Grid item xs={12}>
          <AppraisalClientCard data={data} />
        </Grid>

        <Grid item xs={12}>
          <AppraisalClientTable />
        </Grid>
      </Grid>
    </div>
  )
}

export default App
