// MUI Imports
import Grid from '@mui/material/Grid'

// Components Imports
import Award from '@/views/app/dashBoard/Award'
import Transactions from '@/views/app/dashBoard/Transactions'
import DepositWithdraw from '@/views/app/dashBoard/DepositWithdraw'
import SalesByCountries from '@/views/app/dashBoard/SalesByCountries'
import Table from '@/views/app/dashBoard/Table'

const Dashboard = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={4}>
        <Award />
      </Grid>
      <Grid item xs={12} md={8} lg={8}>
        <Transactions />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <SalesByCountries />
      </Grid>
      <Grid item xs={12} md={6} lg={8}>
        <Table />
      </Grid>
      <Grid item xs={12} lg={8}>
        <DepositWithdraw />
      </Grid>
    </Grid>
  )
}

export default Dashboard
