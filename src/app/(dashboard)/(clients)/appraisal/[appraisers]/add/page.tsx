import React from 'react'

import { headers } from 'next/headers';

import AddAndEditArraiser from '@/views/app/appraisers/addAndeditViews'


const page = () => {
  const headersList = headers();

  // read the custom x-url header

  const url = headersList.get('pathname') || "";
  
  console.log("🚀 ~ page ~ url:", url)




  return (
    <div>
      <AddAndEditArraiser pathname={url}/>
    </div>
  )
}

export default page
