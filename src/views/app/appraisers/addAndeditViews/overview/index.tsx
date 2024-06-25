'use client'

import ContactCard from '@/components/cards'
import CustomizedSteppers from '@/components/stepper'
import TabsList from '@/components/tabsList'
import { location, adjuster, insurance } from '@/data/data'
import Adjuster from '@/modules/app/appraiser/overView/adjuster'
import Insurance from '@/modules/app/appraiser/overView/insurance'
import Location from '@/modules/app/appraiser/overView/location'

const Overview = () => {
  return (
    <div className='grid grid-cols-4 w-full gap-2'>
      <div className='col-span-4 lg:col-span-3 gap-2 flex justify-between flex-col'>
        <div className='hidden lg:inline-block'>
          <CustomizedSteppers />
        </div>

        <TabsList tabs={tabs} type='cards-tab' />

        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
          <ContactCard
            title='Umpire Details'
            card={[
              { label: 'Name', value: 'Rosa Garcia (SplitAlberto Aylormade)', icon: 'ri-account-circle-line' },
              { label: 'Phone', value: '(817) 944-5887 : home', icon: 'ri-phone-line' },
              { label: 'Email', value: 'rosa120606@gmail.com', icon: 'ri-mail-line', isEmail: true },
              { label: 'Status', value: 'pending', icon: 'ri-user-location-line', status: true }
            ]}
          />
          <ContactCard
            title='Opposing Appraiser'
            card={[
              { label: 'Name', value: 'Rosa Garcia (SplitAlberto Aylormade)', icon: 'ri-account-circle-line' },
              { label: 'Phone', value: '(817) 944-5887 : home', icon: 'ri-phone-line' },
              { label: 'Email', value: 'rosa120606@gmail.com', icon: 'ri-mail-line', isEmail: true }
            ]}
          />
        </div>
      </div>

      <div className='col-span-4 lg:col-span-1'>
        <ContactCard
          title='Primary Contact'
          card={[
            { label: 'Name', value: 'Rosa Garcia (SplitAlberto Aylormade)', icon: 'ri-account-circle-line' },
            { label: 'Phone', value: '(817) 944-5887 : home', icon: 'ri-phone-line' },
            { label: 'Email', value: 'rosa120606@gmail.com', icon: 'ri-mail-line', isEmail: true },
            { label: 'Mailing', value: 'Same as Location', icon: 'ri-user-location-line' },
            { label: 'Billing', value: 'Same as Location', icon: 'ri-bill-line' },
            { label: 'Cross Reference', value: '', icon: null }
          ]}
        />
      </div>
    </div>
  )
}

export default Overview

const tabs = [
  {
    label: 'Location Info',
    value: 'photo ',
    component: Location,
    props: location
  },
  {
    label: 'Insurance',
    value: 'insurance ',
    component: Insurance,
    props: insurance
  },
  {
    label: 'Adjuster',
    value: 'adjuster ',
    component: Adjuster,
    props: adjuster
  }
]
