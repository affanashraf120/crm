'use client'

import CustomizedSteppers from '@/components/stepper'
import ContactCard from './cards'

const Overview = () => {
  return (
    <div className='grid grid-cols-4 w-full gap-2'>
      <div className='col-span-3'>
        <CustomizedSteppers />
      </div>

      <div className='col-span-1'>
        <ContactCard />
      </div>
    </div>
  )
}

export default Overview
