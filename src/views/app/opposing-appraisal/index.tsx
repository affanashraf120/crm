'use client'

import { useState } from 'react'

// Mui Imports
import { Grid } from '@mui/material'

// Import Custom Components
import AppraisalCard from './Card'
import Table from '../../../components/tables/table'
import Drawer from '@/components/formDrawer'
import OpposingAppraisalForm from '@/modules/app/opposingAppraiser/opposingAppraisalForm'

const OpposingAppraisal = () => {
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
        <OpposingAppraisalForm />
      </Drawer>
    </Grid>
  )
}

export default OpposingAppraisal

// Dummy data
const data = [
  {
    id: 1,
    oa_name: 'John Doe',
    oa_email: 'john.doe@example.com',
    oa_phone_no: '123-456-7890'
  },
  {
    id: 2,
    oa_name: 'Jane Smith',
    oa_email: 'jane.smith@example.com',
    oa_phone_no: '987-654-3210'
  },
  {
    id: 3,
    oa_name: 'David Brown',
    oa_email: 'david.brown@example.com',
    oa_phone_no: '456-789-0123'
  },
  {
    id: 4,
    oa_name: 'Emily Johnson',
    oa_email: 'emily.johnson@example.com',
    oa_phone_no: '789-012-3456'
  },
  {
    id: 5,
    oa_name: 'Michael Lee',
    oa_email: 'michael.lee@example.com',
    oa_phone_no: '234-567-8901'
  },
  {
    id: 6,
    oa_name: 'Sarah Garcia',
    oa_email: 'sarah.garcia@example.com',
    oa_phone_no: '567-890-1234'
  },
  {
    id: 7,
    oa_name: 'Christopher Martinez',
    oa_email: 'christopher.martinez@example.com',
    oa_phone_no: '901-234-5678'
  },
  {
    id: 8,
    oa_name: 'Amanda Taylor',
    oa_email: 'amanda.taylor@example.com',
    oa_phone_no: '345-678-9012'
  },
  {
    id: 9,
    oa_name: 'Matthew Hernandez',
    oa_email: 'matthew.hernandez@example.com',
    oa_phone_no: '678-901-2345'
  },
  {
    id: 10,
    oa_name: 'Laura Wilson',
    oa_email: 'laura.wilson@example.com',
    oa_phone_no: '012-345-6789'
  },
  {
    id: 11,
    oa_name: 'Daniel Anderson',
    oa_email: 'daniel.anderson@example.com',
    oa_phone_no: '555-555-5555'
  },
  {
    id: 12,
    oa_name: 'Olivia Moore',
    oa_email: 'olivia.moore@example.com',
    oa_phone_no: '777-777-7777'
  },
  {
    id: 13,
    oa_name: 'Jacob Taylor',
    oa_email: 'jacob.taylor@example.com',
    oa_phone_no: '999-999-9999'
  },
  {
    id: 14,
    oa_name: 'Sophia Brown',
    oa_email: 'sophia.brown@example.com',
    oa_phone_no: '888-888-8888'
  },
  {
    id: 15,
    oa_name: 'Ethan Johnson',
    oa_email: 'ethan.johnson@example.com',
    oa_phone_no: '666-666-6666'
  },
  {
    id: 16,
    oa_name: 'Isabella Smith',
    oa_email: 'isabella.smith@example.com',
    oa_phone_no: '444-444-4444'
  },
  {
    id: 17,
    oa_name: 'William Jones',
    oa_email: 'william.jones@example.com',
    oa_phone_no: '222-222-2222'
  },
  {
    id: 18,
    oa_name: 'Madison Davis',
    oa_email: 'madison.davis@example.com',
    oa_phone_no: '333-333-3333'
  },
  {
    id: 19,
    oa_name: 'Alexander Wilson',
    oa_email: 'alexander.wilson@example.com',
    oa_phone_no: '888-999-1111'
  },
  {
    id: 20,
    oa_name: 'Mia Garcia',
    oa_email: 'mia.garcia@example.com',
    oa_phone_no: '111-222-3333'
  },
  {
    id: 21,
    oa_name: 'Benjamin Rodriguez',
    oa_email: 'benjamin.rodriguez@example.com',
    oa_phone_no: '444-555-6666'
  },
  {
    id: 22,
    oa_name: 'Evelyn Martinez',
    oa_email: 'evelyn.martinez@example.com',
    oa_phone_no: '777-888-9999'
  },
  {
    id: 23,
    oa_name: 'James Brown',
    oa_email: 'james.brown@example.com',
    oa_phone_no: '222-333-4444'
  },
  {
    id: 24,
    oa_name: 'Charlotte Davis',
    oa_email: 'charlotte.davis@example.com',
    oa_phone_no: '555-666-7777'
  },
  {
    id: 25,
    oa_name: 'Daniel Hernandez',
    oa_email: 'daniel.hernandez@example.com',
    oa_phone_no: '888-999-0000'
  },
  {
    id: 26,
    oa_name: 'Amelia Wilson',
    oa_email: 'amelia.wilson@example.com',
    oa_phone_no: '111-222-3333'
  },
  {
    id: 27,
    oa_name: 'Lucas Taylor',
    oa_email: 'lucas.taylor@example.com',
    oa_phone_no: '444-555-6666'
  },
  {
    id: 28,
    oa_name: 'Avery Rodriguez',
    oa_email: 'avery.rodriguez@example.com',
    oa_phone_no: '777-888-9999'
  },
  {
    id: 29,
    oa_name: 'Harper Martinez',
    oa_email: 'harper.martinez@example.com',
    oa_phone_no: '222-333-4444'
  },
  {
    id: 30,
    oa_name: 'Logan Brown',
    oa_email: 'logan.brown@example.com',
    oa_phone_no: '555-666-7777'
  }
]

const column = [
  { name: 'oa_name', header: 'OA Name' },
  { name: 'oa_email', header: 'OA Email' },
  { name: 'oa_phone_no', header: 'OA Phone No' }
]
