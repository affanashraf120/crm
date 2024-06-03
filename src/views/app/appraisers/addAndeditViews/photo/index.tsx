'use client'

import React, { useState } from 'react'

import { Button, Typography } from '@mui/material'

import ImageGallery from '@/components/common/imageGallery'
import Dropdown from '@/components/dropDowns/dropDown'
import DNDImage from '@/components/common/dndImage'

const Photo: React.FC = () => {
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium')
  const [isGalleryShown, setIsGalleryShown] = useState(true)

  const handleSizeChange = (selectedSize: string) => {
    if (selectedSize === 'small' || selectedSize === 'medium' || selectedSize === 'large') {
      setSize(selectedSize)
    }
  }

  return (
    <div className='flex flex-col items-center w-full'>
      <div className='flex justify-between items-center w-full gap-2 flex-col md:flex-row'>
        <Typography variant='h4' className='whitespace-nowrap'>Photos & Videos</Typography>

        <div className='flex justify-end items-center w-full '>
          <Dropdown value={size} options={['small', 'medium', 'large']} onChange={handleSizeChange} variant='outline' />
        </div>
        {/* TODO only for test */}
        <Button onClick={() => setIsGalleryShown(!isGalleryShown)} variant='contained'>
          {isGalleryShown ? 'Upload' : 'Gallery'}
        </Button>
      </div>

      <div className='flex justify-center items-center w-full'>
        {isGalleryShown ? (
          <ImageGallery images={images} size={size} alt={images} />
        ) : (
          <div className='flex justify-center h-96 items-center w-full flex-col'>
            <DNDImage />
          </div>
        )}
      </div>
    </div>
  )
}

export default Photo

const images = [
  { src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg', alt: '', date: '2023-01-01' },
  { src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg', alt: '', date: '2023-01-01' },
  { src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg', alt: '', date: '2023-01-01' },
  { src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg', alt: '', date: '2023-05-01' },
  { src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg', alt: '', date: '2023-05-01' },
  { src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg', alt: '', date: '2023-02-01' },
  { src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg', alt: '', date: '2023-02-01' },
  { src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg', alt: '', date: '2023-09-01' },
  { src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg', alt: '', date: '2023-01-01' },
  { src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg', alt: '', date: '2023-01-01' },
  { src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg', alt: '', date: '2023-01-01' },
  { src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg', alt: '', date: '2023-01-01' }
]
