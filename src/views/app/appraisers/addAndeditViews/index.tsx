// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import TabsList from '@/components/tabsList'
import Documents from './documents'
import Form from './form'
import Messages from './messages'
import Overview from './overview'
import Photo from './photo'

// Component Imports for each tab

const AddAndEditArraiser = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} className='flex flex-col gap-6'>
        <TabsList tabs={tabs} />
      </Grid>
    </Grid>
  )
}

export default AddAndEditArraiser

const tabs = [
  {
    label: 'Overview',
    icon: 'ri-menu-search-line',
    value: 'overview',
    component: Overview
  },
  {
    label: 'Form',
    icon: 'ri-pages-line',
    value: 'form',
    component: Form
  },
  {
    label: 'Documents',
    icon: 'ri-file-paper-line',
    value: 'documents',
    component: Documents
  },
  {
    label: 'Photo & Video',
    icon: 'ri-camera-line',
    value: 'photo ',
    component: Photo
  },
  {
    label: 'Messages',
    icon: 'ri-chat-4-line',
    value: 'messages',
    component: Messages
  }
]
