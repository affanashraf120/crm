'use client'

import { useState } from 'react'

// Mui Imports
import { Autocomplete, Grid, TextField } from '@mui/material'

// Import Custom Components
import SummaryDetailCard from '@/components/cards/summaryDetailsCard'

// Import Data
import dummyData from '@/data/data'
import Table from '@/components/tables/table'
import Drawer from '@/components/formDrawer'
import AppraiserForm from '@/modules/app/appraiser/formDrawer'

const AppraisalClient = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleActionsRow = (menuItem: any) => {
    if (menuItem?.label === 'Edit') {
      setOpen(true)
    } else if (menuItem?.label === 'Delete') {
      console.log('🚀 ~ handleActionsRow ~ menuItem?.label:', menuItem?.label)
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <SummaryDetailCard data={data} />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          disablePortal
          fullWidth
          size='small'
          sx={{
            width: '100%',
            [`@media (min-width: 400px)`]: {
              width: '300px'
            }
          }}
          disableClearable={true}
          options={top100Films}
          renderInput={params => <TextField {...params} label='Search New Client' />}
        />
      </Grid>

      <Grid item xs={12}>
        {data && (
          <Table
            defaultData={dummyData}
            columnArray={column}
            tableTitle='Umpire Table'
            actionButton={handleOpen}
            onEditRow={handleActionsRow}
          />
        )}
      </Grid>

      <Drawer open={open} setOpen={() => setOpen(false)}>
        <AppraiserForm />
      </Drawer>
    </Grid>
  )
}

export default AppraisalClient

const top100Films = [
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
  { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { label: 'The Matrix', year: 1999 },
  { label: 'Seven Samurai', year: 1954 },
  { label: 'City of God', year: 2002 },
  { label: 'Se7en', year: 1995 },
  { label: 'The Silence of the Lambs', year: 1991 },
  { label: "It's a Wonderful Life", year: 1946 },
  { label: 'Life Is Beautiful', year: 1997 },
  { label: 'The Usual Suspects', year: 1995 },
  { label: 'Spirited Away', year: 2001 },
  { label: 'Saving Private Ryan', year: 1998 },
  { label: 'Once Upon a Time in the West', year: 1968 },
  { label: 'American History X', year: 1998 },
  { label: 'Interstellar', year: 2014 },
  { label: 'Casablanca', year: 1942 },
  { label: 'City Lights', year: 1931 },
  { label: 'Psycho', year: 1960 },
  { label: 'The Green Mile', year: 1999 },
  { label: 'Modern Times', year: 1936 },
  { label: 'Raiders of the Lost Ark', year: 1981 },
  { label: 'Rear Window', year: 1954 },
  { label: 'The Pianist', year: 2002 },
  { label: 'The Departed', year: 2006 },
  { label: 'Terminator 2: Judgment Day', year: 1991 },
  { label: 'Back to the Future', year: 1985 },
  { label: 'Whiplash', year: 2014 },
  { label: 'Gladiator', year: 2000 },
  { label: 'Memento', year: 2000 },
  { label: 'The Prestige', year: 2006 },
  { label: 'The Lion King', year: 1994 },
  { label: 'Apocalypse Now', year: 1979 },
  { label: 'Alien', year: 1979 },
  { label: 'Sunset Boulevard', year: 1950 }
]

const data: any[] = [
  {
    title: 'Alpha',
    subTitle: 'alpha@gmail.com',
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

const column = [
  { name: 'id', header: '', type: 'DND' },
  { name: 'inv', header: 'INV #', type: 'simple' },
  {
    name: 'status',
    header: 'Status',
    type: 'DropdownWithChip',
    options: [
      { id: 0, value: 'None', color: 'default' },
      { id: 1, value: 'Closed', color: 'info' },
      { id: 2, value: 'Open', color: 'success' },
      { id: 3, value: 'Scheduling Inspection', color: 'default' },
      { id: 4, value: 'Umpire', color: 'primary' }
    ]
  },
  {
    name: 'assigned_to',
    header: 'Assigned to',
    type: 'Dropdown',
    options: [
      'John Doe',
      'Jane Smith',
      'Mark Johnson',
      'Emily Brown',
      'Sarah Wilson',
      'Michael Davis',
      'Alex Johnson',
      'Emma Garcia'
    ]
  },
  {
    name: 'client_name',
    header: 'Client Name',
    type: 'ClientDetails'
  },
  {
    name: 'claim_no',
    header: 'Claim No',
    type: 'simple'
  },
  {
    name: 'date_sent',
    header: 'Date Sent',
    type: 'simple'
  },
  {
    name: 'carrier',
    header: 'Carrier',
    type: 'Dropdown',
    options: [
      'Michael',
      'Jennifer',
      'David',
      'Sarah',
      'John',
      'Emily',
      'Ashley',
      'Robert',
      'Amanda',
      'William',
      'Melissa'
    ]
  },
  {
    name: 'oa_name',
    header: 'OA Name',
    type: 'simple'
  },
  {
    name: 'oa_email',
    header: 'OA Email',
    type: 'simple'
  },
  {
    name: 'oa_phone_no',
    header: 'OA Phone NO',
    type: 'simple'
  },
  {
    name: 'umpire_name',
    header: 'Umpire Name',
    type: 'DropdownWithChipAndText',
    options: [
      { id: 0, value: 'None', color: 'default' },
      { id: 1, value: 'Initiated', color: 'success' },
      { id: 2, value: 'W9 & Invoice Received', color: 'info' },
      { id: 3, value: 'Payment Sent', color: 'warning' },
      { id: 4, value: 'Try To Schedule', color: 'primary' },
      { id: 5, value: 'Inspection Schedule', color: 'info' },
      { id: 6, value: 'Roof Bought', color: 'warning' },
      { id: 7, value: 'Roof Denied', color: 'success' },
      { id: 8, value: 'Inspection Schedule', color: 'primary' }
    ]
  },
  {
    name: 'umpire_email',
    header: 'Umpire Email',
    type: 'simple'
  },
  {
    name: 'umpire_phone_no',
    header: 'Umpire Phone NO',
    type: 'simple'
  },
  {
    name: 'city',
    header: 'City',
    type: 'Dropdown',
    options: [
      'Anytown',
      'Othertown',
      'Anycity',
      'Anothercity',
      'Newcity',
      'Yetanothercity',
      'Metropolitan City',
      'Capital City'
    ]
  },
  {
    name: 'address',
    header: 'Address',
    type: 'TextWithTooltip',
    size: 12
  },
  {
    name: 'appraisal_amt',
    header: 'Appraisal Amount',
    type: 'simple'
  },
  {
    name: 'percentage',
    header: 'Percentage',
    type: 'simple'
  },
  {
    name: 'date_approved',
    header: 'Date Approved',
    type: 'simple'
  },
  {
    name: 'inspection_date',
    header: 'Inspection Date',
    type: 'simple'
  },
  {
    name: 'turnaround',
    header: 'Turnaround',
    type: 'simple'
  },
  {
    name: 'comm_amt',
    header: 'Commission Amount',
    type: 'simple'
  },
  {
    name: 'notes',
    header: 'Notes',
    type: 'TextWithTooltip',
    size: 12
  },
  {
    name: 'date_qb_invoiced',
    header: 'Date QB Invoiced',
    type: 'simple'
  },
  {
    name: 'date_user_paid',
    header: 'Date User Paid',
    type: 'simple'
  },
  {
    name: 'action',
    header: 'Action',
    type: 'Action',
    options: [
      { label: 'Delete', icon: 'ri-delete-bin-7-line' },
      { label: 'Edit', icon: 'ri-pencil-line' }
    ]
  }
]
