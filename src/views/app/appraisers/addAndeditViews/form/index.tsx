'use client'

import { Grid } from '@mui/material'

import ConfirmationDeleteAccount from '@/modules/app/clients/confirmationDeleteAccount'
import AppraiserForm from '@/modules/app/appraiser/formDrawer'

const Form = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <AppraiserForm />
      </Grid>
      <Grid item xs={12}>
        <ConfirmationDeleteAccount />
      </Grid>
    </Grid>
  )
}

export default Form
