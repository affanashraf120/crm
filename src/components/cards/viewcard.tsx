import React from 'react'

import { Card, CardContent, Typography, Grid, Box } from '@mui/material'

// Define types for the data
interface ClientDetail {
  title: string
  text: string
  group: string
}

const ClientsView: ClientDetail[] = [
  { title: 'Invoice Number', text: 'INV123456', group: 'Appraiser Details' },
  { title: 'Claim Number', text: 'CLM789012', group: 'Appraiser Details' },
  { title: 'Name', text: 'John Doe', group: 'Appraiser Details' },
  { title: 'Email', text: 'john.doe@example.com', group: 'Appraiser Details' },
  { title: 'Status', text: 'Open', group: 'Appraiser Details' },
  { title: 'Assigned to', text: 'Harry', group: 'Appraiser Details' },
  { title: 'Date Sent', text: '2024-01-01', group: 'Appraiser Details' },
  { title: 'Carrier', text: 'Carrier 1', group: 'Insurance Details' },
  { title: 'City', text: 'New York', group: 'Appraiser Details' },
  { title: 'OA Name', text: 'Jane Smith', group: 'OA Information' },
  { title: 'OA Email', text: 'jane.smith@example.com', group: 'OA Information' },
  { title: 'OA Phone Number', text: '123-456-7890', group: 'OA Information' },
  { title: 'Umpire Status', text: 'Initiated', group: 'Umpire Information' },
  { title: 'Umpire Name', text: 'Harry Potter', group: 'Umpire Information' },
  { title: 'Umpire Email', text: 'harry.potter@example.com', group: 'Umpire Information' },
  { title: 'Umpire Phone Number', text: '098-765-4321', group: 'Umpire Information' },
  { title: 'Inspection Date', text: '2024-01-15', group: 'Appraiser Details' },
  { title: 'Appraisal Amount', text: '5000', group: 'Appraiser Details' },
  { title: 'Percentage', text: '10%', group: 'Appraiser Details' },
  { title: 'Date Approved', text: '2024-02-01', group: 'Appraiser Details' },
  { title: 'Turnaround', text: '2 weeks', group: 'Appraiser Details' },
  { title: 'Commission Amount', text: '500', group: 'Appraiser Details' },
  { title: 'Date QB Invoiced', text: '2024-03-01', group: 'Appraiser Details' },
  { title: 'Date User Paid', text: '2024-03-15', group: 'Appraiser Details' },
  { title: 'Address', text: '123 Main St, New York, NY', group: 'Appraiser Details' }
]

const groupData = (data: ClientDetail[]) => {
  return data.reduce<{ [key: string]: ClientDetail[] }>((acc, item) => {
    if (!acc[item.group]) {
      acc[item.group] = []
    }

    acc[item.group].push(item)

    return acc
  }, {})
}

const groupedData = groupData(ClientsView)

const ProfileCard: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        {Object.keys(groupedData)
          .filter(group => group === 'Appraiser Details')
          .map((group, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant='h6' sx={{ mb: 1 }}>
                  {group}
                </Typography>
                {groupedData[group].map((item, itemIndex) => (
                  <Box
                    key={itemIndex}
                    display='flex'
                    flexDirection={{ xs: 'column', md: 'row' }}
                    flexWrap='wrap'
                    mb={1}
                  >
                    <Typography variant='caption'>{item.title}: </Typography>
                    <Typography variant='body2'>{item.text}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          ))}
      </Grid>
      <Grid item xs={12} md={6}>
        {Object.keys(groupedData)
          .filter(group => group !== 'Appraiser Details')
          .map((group, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant='h6' sx={{ mb: 1 }}>
                  {group}
                </Typography>
                {groupedData[group].map((item, itemIndex) => (
                  <Box
                    key={itemIndex}
                    display='flex'
                    flexDirection={{ xs: 'column', md: 'row' }}
                    flexWrap='wrap'
                    mb={1}
                  >
                    <Typography variant='caption'>{item.title}: </Typography>
                    <Typography variant='body2'>{item.text}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          ))}
      </Grid>
    </Grid>
  )
}

export default ProfileCard
