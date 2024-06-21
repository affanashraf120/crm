'use client'

// import
import { useState } from 'react'

import { usePathname, useRouter } from 'next/navigation'

// Mui Imports
import { Autocomplete, Grid, TextField } from '@mui/material'

// Import Custom Components
import SummaryDetailCard from '@/components/cards/summaryDetailsCard'

// Import Data
import FormDialog from '@/components/dialogBox/formDialog'
import Table from '@/components/tables/table'
import { tableFilters, dummyData } from '@/data/data'
import ManageColumnsDialog from '@/modules/app/appraiser/manageColumnsDialog'
import { sortAndFilterArray2 } from '@/utils'
import FilterAccordion from '@/components/filters'

const AppraisalClient = () => {
  const pathname = usePathname()
  const route = useRouter()
  const [open, setOpen] = useState(false)
  const [selectedItems, setSelectedItems] = useState(column)
  const [openFilter, setOpenFilter] = useState(false)
  const [count, setCount] = useState(0)

  const handleCheckboxSubmit = (selectedItems: any) => {
    setSelectedItems(selectedItems)

    setOpen(false)

    // Filter the headers array to get only active headers and position
    const activeHeaders = sortAndFilterArray2(selectedItems, column)

    activeHeaders.unshift({
      name: 'action',
      header: 'Action',
      type: 'Action',
      options: [
        { label: 'Delete', icon: 'ri-delete-bin-7-line' },
        { label: 'Edit', icon: 'ri-pencil-line' }
      ]
    })

    activeHeaders.unshift({ name: 'id', header: '', type: 'DND' })

    setSelectedItems(activeHeaders)
  }

  const handleClose = () => {
    setOpen(!open)
  }

  // const [open, setOpen] = useState(false)

  const handleOpen = () => {
    route.push(`${pathname}/add`)
  }

  const handleActionsRow = (menuItem: any) => {
    if (menuItem?.label === 'Edit') {
      route.push(`${pathname}/${menuItem.id}`)
    } else if (menuItem?.label === 'Delete') {
      console.log('🚀 ~ handleActionsRow ~ menuItem?.label:', menuItem?.label)
    }
  }

  const handleSortActions = (item: any) => {
    console.log('🚀 ~ handleSortActions ~ item:', item)
  }

  const handleFilters = (item: any) => {
    setOpenFilter(!openFilter)

    let activeCount = 0

    item.forEach((item: any) => {
      item.filters.forEach((filter: any) => {
        if (filter.active) {
          activeCount++
        }
      })
    })

    setCount(activeCount)
    console.log('🚀 ~ handleFilters ~ item:', item)
  }

  const handleMangeColumn = () => {
    setOpen(true)
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
            data={dummyData}
            columns={selectedItems}
            buttonName='Add New'
            title='Alpha Appraisals (10% or $250 min)'
            onActions={handleActionsRow}
            onFilterActions={handleSortActions}
            actionButtons={[
              {
                label: 'Add New',
                onClick: handleOpen,
                variant: 'contained',
                color: 'primary',
                type: 'button',
                icon: 'ri-add-line'
              },
              {
                label: 'Columns',
                onClick: handleMangeColumn,
                variant: 'contained',
                color: 'primary',
                type: 'button',
                icon: 'ri-settings-5-line'
              },
              {
                label: 'Filter',
                onClick: () => setOpenFilter(!openFilter),
                variant: 'contained',
                color: 'primary',
                type: 'button',
                icon: 'ri-filter-3-fill',
                filterCount: count
              }
            ]}
          />
        )}
      </Grid>

      <FormDialog open={open} onClose={handleClose} dialogTitle='Manage Columns' closeButton={true}>
        <ManageColumnsDialog columns={column} onSubmit={handleCheckboxSubmit} onClose={handleClose} />
      </FormDialog>

      {/* Multiple Filters */}

      <FormDialog open={openFilter} onClose={() => setOpenFilter(!openFilter)} dialogTitle='Filters' closeButton={true}>
        <FilterAccordion onApplyFilter={handleFilters} filtersData={tableFilters} />
      </FormDialog>
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

  {
    name: 'action',
    header: 'Action',
    type: 'Action',
    options: [
      { label: 'Delete', icon: 'ri-delete-bin-7-line' },
      { label: 'Edit', icon: 'ri-pencil-line' }
    ]
  },
  {
    name: 'inv',
    header: 'INV #',
    type: 'simple',
    filterType: 'sort',
    buttonOptions: [{ label: 'Sort By Latest Invoice ' }, { label: 'Sort By Most Earliest Invoice' }]
  },
  {
    name: 'status',
    header: 'Status',
    type: 'DropdownWithChip',
    filterType: 'filter',
    filterOptions: [
      { label: 'Closed', active: false },
      { label: 'None', active: false },
      { label: 'Open', active: false },
      { label: 'Scheduling Inspection', active: false },
      { label: 'Umpire', active: false }
    ],
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
    filterType: 'filter',
    filterOptions: [
      { active: false, label: 'John Doe' },
      { active: false, label: 'Jane Smith' },
      { active: false, label: 'Mark Johnson' },
      { active: false, label: 'Emily Brown' },
      { active: false, label: 'Sarah Wilson' },
      { active: false, label: 'Michael Davis' },
      { active: false, label: 'Alex Johnson' },
      { active: false, label: 'Emma Garcia' }
    ],
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
    type: 'ClientDetails',
    filterType: 'filter',
    filterOptions: [
      { active: false, label: 'Emily Brown' },
      { active: false, label: 'Sarah Wilson' },
      { active: false, label: 'Michael Davis' },
      { active: false, label: 'Alex Johnson' }
    ]
  },
  {
    name: 'claim_no',
    header: 'Claim No',
    type: 'simple',
    filterType: 'sort',
    buttonOptions: [{ label: 'Sort By Latest Claim No ' }, { label: 'Sort By Most Earliest Claim No' }]
  },
  {
    name: 'date_sent',
    header: 'Date Sent',
    type: 'simple',
    filterType: 'rangeDate'
  },

  {
    name: 'carrier',
    header: 'Carrier',
    type: 'Dropdown',
    options: [
      'Amanda Corporation',
      'John Corporation',
      'Melissa Corporation',
      'William Corporation',
      'Ashley Corporation',
      'Emily Corporation',
      'Emma Abc Corporation'
    ],
    filterType: 'filter',
    filterOptions: [
      { active: false, label: 'Amanda Corporation' },
      { active: false, label: 'John Corporation' },
      { active: false, label: 'Melissa Corporation' },
      { active: false, label: 'William Corporation' },
      { active: false, label: 'Ashley Corporation' },
      { active: false, label: 'Emily Corporation' },
      { active: false, label: 'Emma Abc Corporation' }
    ]
  },
  {
    name: 'oa_name',
    cellLabels: ['oa_email', 'oa_phone_no'],
    header: 'OA Info',
    type: 'cellLabels',
    filterType: 'filter',
    filterOptions: [
      { active: false, label: 'Sarah Wilson' },
      { active: false, label: 'Jane Smith' },
      { active: false, label: 'Mark Johnson' },
      { active: false, label: 'Michael Davis' },
      { active: false, label: 'Emily Brown' },
      { active: false, label: 'Emma Garcia' },
      { active: false, label: 'Alex Johnson' }
    ]
  },

  {
    name: 'umpire_name',
    cellLabels: ['umpire_email', 'umpire_phone_no'],
    header: 'Umpire Info',
    type: 'dropdown_chip_and_text_with_cellLabels',
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
    ],
    filterType: 'filter',
    filterOptions: [
      { active: false, label: 'Emily Brown' },
      { active: false, label: 'Michael Davis' },
      { active: false, label: 'Mark Johnson' },
      { active: false, label: 'Jane Smith' },
      { active: false, label: 'John Doe' },
      { active: false, label: 'Sarah Wilson' },
      { active: false, label: 'Alex Johnson' },
      { active: false, label: 'Emma Garcia' }
    ]
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
    ],
    filterType: 'filter',
    filterOptions: [
      { active: false, label: 'Anytown' },
      { active: false, label: 'Othertown' },
      { active: false, label: 'Anycity' },
      { active: false, label: 'Anothercity' },
      { active: false, label: 'Newcity' },
      { active: false, label: 'Yetanothercity' },
      { active: false, label: 'Metropolitan City' },
      { active: false, label: 'Capital City' }
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
    type: 'simple',
    filterType: 'range'
  },
  {
    name: 'percentage',
    header: 'Percentage',
    type: 'simple',
    filterType: 'filter',
    filterOptions: [
      { label: '2.5%', active: false },
      { label: '5%', active: false },
      { label: '10%', active: false }
    ]
  },
  {
    name: 'date_approved',
    header: 'Date Approved',
    type: 'simple',
    filterType: 'rangeDate'
  },
  {
    name: 'inspection_date',
    header: 'Inspection Date',
    type: 'simple',
    filterType: 'rangeDate'
  },
  {
    name: 'turnaround',
    header: 'Turnaround',
    type: 'simple',
    filterType: 'range'
  },
  {
    name: 'comm_amt',
    header: 'Commission Amount',
    type: 'simple',
    filterType: 'range'
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
    type: 'simple',
    filterType: 'rangeDate'
  },
  {
    name: 'date_user_paid',
    header: 'Date User Paid',
    type: 'simple',
    filterType: 'rangeDate'
  }
]
