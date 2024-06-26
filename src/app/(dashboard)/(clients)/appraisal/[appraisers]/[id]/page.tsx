import React from 'react'

import AddAndEditArraiser from '@/views/app/appraisers/addAndeditViews'

const page = ({
  params,
  searchParams
}: {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) => {
  console.log('🚀 ~ params:', params, searchParams)
  
  // todo validate the id from the params 

  const url = searchParams?.q as string || ''

  return (
    <div>
      <AddAndEditArraiser pathname={url}/>
    </div>
  )
}

export default page
