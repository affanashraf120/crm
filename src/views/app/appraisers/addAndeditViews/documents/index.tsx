'use client'

import React from 'react'

import { Button, Typography } from '@mui/material'

import DNDImage from '@/components/common/dndImage'

// import ImageGallery from '@/components/common/imageGallery'

const Documents: React.FC = () => {
  return (
    <div className='flex flex-col items-center w-full'>
      <div className='flex justify-between items-center w-full gap-2 flex-col md:flex-row'>
        <Typography variant='h4' className='whitespace-nowrap'>
          Photos & Videos
        </Typography>

        {/* TODO only for test */}
        <Button variant='contained' startIcon={<i className='ri-upload-cloud-2-line'></i>}>
          {' '}
          Upload
        </Button>
      </div>

      <div className='flex justify-center h-96 items-center w-full flex-col '>
        <DNDImage />
      </div>
    </div>
  )
}

export default Documents
