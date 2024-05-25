'use client'

import { useState } from 'react'

// Mui imports
import { Grid } from '@mui/material'

// import Custom Components
import SummaryDetailCard from '@/components/cards/summaryDetailsCard'
import ListViewTable from '@/components/tables/listViewTable'
import AddClient from '@/modules/app/clients/addClientForm'
import ConfirmationDeleteAccount from '@/modules/app/clients/confirmationDeleteAccount'

function Clients() {
  const [openAddClientForm, setOpenAddClientForm] = useState(false)

  const handleAction = () => {
    setOpenAddClientForm(!openAddClientForm)

    
  }

  return (
    <>
      {openAddClientForm ? (
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <AddClient handleAction={handleAction} />
          </Grid>
          <Grid item xs={12}>
            <ConfirmationDeleteAccount />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={6}>
          <Grid item xs={12}>
            {data && <SummaryDetailCard data={data} />}
          </Grid>

          <Grid item xs={12}>
            <ListViewTable clickable={false} actionButton={true} handleAction={handleAction} />
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default Clients

const data: any[] = [
  {
    title: '24',
    subTitle: 'Clients',
    avatarIcon: 'ri-user-3-line',
    avatarColor: 'primary'
  },
  {
    title: 165,
    subTitle: 'Open Appraisals',
    avatarIcon: 'ri-file-text-line',
    avatarColor: 'error'
  },
  {
    title: '26',
    subTitle: 'Closed Appraisals',
    avatarIcon: 'ri-file-check-line',
    avatarColor: 'success'
  },
  {
    title: '$876',
    subTitle: 'Revenue',
    avatarIcon: 'ri-money-dollar-circle-line',
    avatarColor: 'warning'
  }
]
