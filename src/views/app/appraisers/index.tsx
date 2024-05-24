'use client'

// Mui Imports
import { Autocomplete, Grid, TextField } from '@mui/material'


// Import Custom Components
import ClientTable from './Table'
import SummaryDetailCard from '@/components/cards/summaryDetailsCard'

// Import Data
import dummyData from '@/data/data'

const AppraisalClient = () => {
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
        <ClientTable defaultData={dummyData} />
      </Grid>
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