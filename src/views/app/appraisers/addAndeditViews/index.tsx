// Component Imports
import TabsList from '@/components/tabsList'
import Documents from './documents'
import Form from './form'
import Messages from './messages'
import Overview from './overview'
import Photo from './photo'

// Component Imports for each tab

const AddAndEditArraiser = ({ pathname }: {pathname?: string | undefined}) => {
  return <TabsList tabs={tabs} consumer={consumers} _activeTab={pathname?.endsWith('add') ? 'form' : ''} />
}

export default AddAndEditArraiser

const tabs = [
  {
    label: 'Overview',
    icon: 'ri-menu-search-line',
    value: 'overview',
    component: Overview,
    active: false
  },
  {
    label: 'Form',
    icon: 'ri-pages-line',
    value: 'form',
    component: Form,
    active: false
  },
  {
    label: 'Documents',
    icon: 'ri-file-paper-line',
    value: 'documents',
    component: Documents,
    active: false
  },
  {
    label: 'Photo & Video',
    icon: 'ri-camera-line',
    value: 'photo ',
    component: Photo,
    active: false
  },
  {
    label: 'Messages',
    icon: 'ri-chat-4-line',
    value: 'messages',
    component: Messages,
    active: false
  }
]

const consumers = [
  {
    label: 'Consumer 1',
    address: '123 Main St, Newcity, USA',
    image: '/images/avatars/1.png',
    active: true
  },
  {
    label: 'Consumer 2',
    address: '422 Main St, Newcity, USA',
    image: '/images/avatars/2.png',
    active: false
  },
  {
    label: 'Consumer 3',
    address: '1qq Main St, Newcity, USA',
    image: '/images/avatars/3.png',
    active: false
  },
  {
    label: 'Consumer 4',
    address: '112 Main St, Newcity, USA',
    image: '/images/avatars/4.png',
    active: false
  }
]
