'use client'

import { useState } from 'react'

// Mui Imports
import {  Grid } from '@mui/material'

// Import Custom Components
import Table from '../../../components/tables/table'
import AppraisalCard from './Card'
import UmpireInfoForm from '@/modules/app/umpireInfo/umpireInfoForm'
import Drawer from '@/components/formDrawer'

const Umpire = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <AppraisalCard />
      </Grid>
      <Grid item xs={12}>
        {data && (
          <Table
            defaultData={data}
            columnArray={column}
            RowDragRows={true}
            handleActions={true}
            tableTitle='Opposing Appraisal Table'
            actionButton={handleOpen}
          />
        )}
      </Grid>

      <Drawer open={open} setOpen={() => setOpen(false)}>
        <UmpireInfoForm />
      </Drawer>
    </Grid>
  )
}

export default Umpire

// Dummy data
const data = [
  {
    id: 1,
    umpire_name: 'John Doe',
    umpire_email: 'john.doe@example.com',
    umpire_phone_no: '123-456-7890'
  },
  {
    id: 2,
    umpire_name: 'Jane Smith',
    umpire_email: 'jane.smith@example.com',
    umpire_phone_no: '987-654-3210'
  },
  {
    id: 3,
    umpire_name: 'David Brown',
    umpire_email: 'david.brown@example.com',
    umpire_phone_no: '456-789-0123'
  },
  {
    id: 4,
    umpire_name: 'Emily Johnson',
    umpire_email: 'emily.johnson@example.com',
    umpire_phone_no: '789-012-3456'
  },
  {
    id: 5,
    umpire_name: 'Michael Lee',
    umpire_email: 'michael.lee@example.com',
    umpire_phone_no: '234-567-8901'
  },
  {
    id: 6,
    umpire_name: 'Sarah Garcia',
    umpire_email: 'sarah.garcia@example.com',
    umpire_phone_no: '567-890-1234'
  },
  {
    id: 7,
    umpire_name: 'Christopher Martinez',
    umpire_email: 'christopher.martinez@example.com',
    umpire_phone_no: '901-234-5678'
  },
  {
    id: 8,
    umpire_name: 'Amanda Taylor',
    umpire_email: 'amanda.taylor@example.com',
    umpire_phone_no: '345-678-9012'
  },
  {
    id: 9,
    umpire_name: 'Matthew Hernandez',
    umpire_email: 'matthew.hernandez@example.com',
    umpire_phone_no: '678-901-2345'
  },
  {
    id: 10,
    umpire_name: 'Laura Wilson',
    umpire_email: 'laura.wilson@example.com',
    umpire_phone_no: '012-345-6789'
  },
  {
    id: 11,
    umpire_name: 'Daniel Anderson',
    umpire_email: 'daniel.anderson@example.com',
    umpire_phone_no: '555-555-5555'
  },
  {
    id: 12,
    umpire_name: 'Olivia Moore',
    umpire_email: 'olivia.moore@example.com',
    umpire_phone_no: '777-777-7777'
  },
  {
    id: 13,
    umpire_name: 'Jacob Taylor',
    umpire_email: 'jacob.taylor@example.com',
    umpire_phone_no: '999-999-9999'
  },
  {
    id: 14,
    umpire_name: 'Sophia Brown',
    umpire_email: 'sophia.brown@example.com',
    umpire_phone_no: '888-888-8888'
  },
  {
    id: 15,
    umpire_name: 'Ethan Johnson',
    umpire_email: 'ethan.johnson@example.com',
    umpire_phone_no: '666-666-6666'
  },
  {
    id: 16,
    umpire_name: 'Isabella Smith',
    umpire_email: 'isabella.smith@example.com',
    umpire_phone_no: '444-444-4444'
  },
  {
    id: 17,
    umpire_name: 'William Jones',
    umpire_email: 'william.jones@example.com',
    umpire_phone_no: '222-222-2222'
  },
  {
    id: 18,
    umpire_name: 'Madison Davis',
    umpire_email: 'madison.davis@example.com',
    umpire_phone_no: '333-333-3333'
  },
  {
    id: 19,
    umpire_name: 'Alexander Wilson',
    umpire_email: 'alexander.wilson@example.com',
    umpire_phone_no: '888-999-1111'
  },
  {
    id: 20,
    umpire_name: 'Mia Garcia',
    umpire_email: 'mia.garcia@example.com',
    umpire_phone_no: '111-222-3333'
  },
  {
    id: 21,
    umpire_name: 'Benjamin Rodriguez',
    umpire_email: 'benjamin.rodriguez@example.com',
    umpire_phone_no: '444-555-6666'
  },
  {
    id: 22,
    umpire_name: 'Evelyn Martinez',
    umpire_email: 'evelyn.martinez@example.com',
    umpire_phone_no: '777-888-9999'
  },
  {
    id: 23,
    umpire_name: 'James Brown',
    umpire_email: 'james.brown@example.com',
    umpire_phone_no: '222-333-4444'
  },
  {
    id: 24,
    umpire_name: 'Charlotte Davis',
    umpire_email: 'charlotte.davis@example.com',
    umpire_phone_no: '555-666-7777'
  },
  {
    id: 25,
    umpire_name: 'Daniel Hernandez',
    umpire_email: 'daniel.hernandez@example.com',
    umpire_phone_no: '888-999-0000'
  },
  {
    id: 26,
    umpire_name: 'Amelia Wilson',
    umpire_email: 'amelia.wilson@example.com',
    umpire_phone_no: '111-222-3333'
  },
  {
    id: 27,
    umpire_name: 'Lucas Taylor',
    umpire_email: 'lucas.taylor@example.com',
    umpire_phone_no: '444-555-6666'
  },
  {
    id: 28,
    umpire_name: 'Avery Rodriguez',
    umpire_email: 'avery.rodriguez@example.com',
    umpire_phone_no: '777-888-9999'
  },
  {
    id: 29,
    umpire_name: 'Harper Martinez',
    umpire_email: 'harper.martinez@example.com',
    umpire_phone_no: '222-333-4444'
  },
  {
    id: 30,
    umpire_name: 'Logan Brown',
    umpire_email: 'logan.brown@example.com',
    umpire_phone_no: '555-666-7777'
  }
]

const column = [
  { name: 'umpire_name', header: 'Umpire Name' },
  { name: 'umpire_email', header: 'Umpire Email' },
  { name: 'umpire_phone_no', header: 'Umpire Phone No' }
]
