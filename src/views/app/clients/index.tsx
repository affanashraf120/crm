'use client'

import { useState } from 'react'

// Mui imports
import { Grid } from '@mui/material'

// import Custom Components
import SummaryDetailCard from '@/components/cards/summaryDetailsCard'
import ProfileCard from '@/components/cards/viewcard'
import FormDialog from '@/components/dialogBox/formDialog'
import ConfirmationDialog from '@/components/dialogs/confirmation-dialog'
import ListViewTable from '@/components/tables/listViewTable'
import AddClient from '@/modules/app/clients/addClientForm'
import ConfirmationDeleteAccount from '@/modules/app/clients/confirmationDeleteAccount'

function Clients() {
  const [openAddClientForm, setOpenAddClientForm] = useState(false)
  const [open, setOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [clientName, setClientName] = useState('')

  const handleAction = (item: string) => {
    const action = item?.toLowerCase()

    switch (action) {
      case 'delete':
        setOpen(true)
        break
      case 'view':
        setIsEdit(true)
        break
      case 'edit':
        setOpenAddClientForm(true)
        break
      default:
        console.log('Unknown action:', action)
    }
  }

  const handleRowClick = (item: string) => {
    console.log('🚀 ~ handleRowClick ~ item:', item)
    setClientName(item)

    setOpenAddClientForm(true)
  }

  const handleClose = () => {
    setOpenAddClientForm(false)
    setIsEdit(false)
  }

  return (
    <>
      {openAddClientForm ? (
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <AddClient onAction={handleClose} />
          </Grid>
          <Grid item xs={12}>
            <ConfirmationDeleteAccount />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={6}>
          <Grid item xs={12}>
            {data && <SummaryDetailCard data={data} classes='xl:col-span-6' />}
          </Grid>

          <Grid item xs={12}>
            <ListViewTable
              data={listData}
              clickable={[
                { title: 'Edit', icon: 'ri-pencil-fill w-4 h-4' },
                { title: 'View', icon: 'ri-eye-line w-4 h-4' },
                { title: 'Delete', icon: 'ri-delete-bin-7-line w-4 h-4' }
              ]}
              actionButton={true}
              onActions={handleAction}
              onClickRow={handleRowClick}
            />
          </Grid>
        </Grid>
      )}

      <ConfirmationDialog
        open={open}
        setOpen={setOpen}
        type='delete-account'
        title='Are you sure you want to delete this client?'
      />

      <FormDialog open={isEdit} onClose={() => setIsEdit(false)} dialogTitle={clientName} closeButton={true}>
        <ProfileCard />
      </FormDialog>
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
    title: '$876',
    subTitle: 'Revenue',
    avatarIcon: 'ri-money-dollar-circle-line',
    avatarColor: 'warning'
  }
]

const listData = [
  { companyName: 'Rubinsky', amount: '$1234' },
  { companyName: 'Best Roofer Solar', amount: '$1234' },
  { companyName: 'Veteran', amount: '$1234' },
  { companyName: 'Builditect', amount: '$1234' },
  { companyName: 'Spartan', amount: '$1234' },
  { companyName: 'Priority', amount: '$1234' },
  { companyName: 'Miller Storm', amount: '$1234' },
  { companyName: 'Rhino', amount: '$1234' },
  { companyName: 'Adam Construction', amount: '$1234' },
  { companyName: 'Mountain Ridge Roofing', amount: '$1234' },
  { companyName: 'Alpha', amount: '$1234' },
  { companyName: 'Buccy', amount: '$1234' },
  { companyName: 'Zeus', amount: '$1234' },
  { companyName: 'Roof Experts', amount: '$1234' },
  { companyName: 'Maverick', amount: '$1234' },
  { companyName: 'J&K', amount: '$1234' },
  { companyName: 'Heart of Texas', amount: '$1234' },
  { companyName: 'Triton', amount: '$1234' },
  { companyName: 'BME', amount: '$1234' },
  { companyName: "Son's Roofing", amount: '$1234' },
  { companyName: 'K Builders', amount: '$1234' },
  { companyName: 'LDJ', amount: '$1234' },
  { companyName: 'VinMark', amount: '$1234' },
  { companyName: 'Orange', amount: '$1234' },
  { companyName: 'ProNail', amount: '$1234' },
  { companyName: 'Revive', amount: '$1234' },
  { companyName: 'Insured', amount: '$1234' },
  { companyName: 'Vertex', amount: '$1234' },
  { companyName: 'Sequoia', amount: '$1234' }
]
