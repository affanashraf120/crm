'use client'

import React, { useState } from 'react'

import { Button, InputAdornment, TextField, Typography } from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'

import ImageGallery from '@/components/common/imageGallery'
import Dropdown from '@/components/dropDowns/dropDown'
import DNDImage from '@/components/common/dndImage'

const Photo: React.FC = () => {
  const [size, setSize] = useState<'Small' | 'Medium' | 'Large'>('Medium')
  const [isGalleryShown, setIsGalleryShown] = useState(true)

  const handleSizeChange = (selectedSize: string) => {
    if (selectedSize === 'Small' || selectedSize === 'Medium' || selectedSize === 'Large') {
      setSize(selectedSize)
    }
  }

  return (
    <div className='flex flex-col items-center w-full'>
      <div className='flex justify-between items-center w-full gap-2 flex-col md:flex-row'>
        <Typography variant='h4' className='whitespace-nowrap'>
          Photos & Videos
        </Typography>

        {/* TODO only for test */}
        <Button
          onClick={() => setIsGalleryShown(!isGalleryShown)}
          variant='contained'
          startIcon={<i className='ri-upload-cloud-2-line'></i>}
        >
          {isGalleryShown ? 'Upload' : 'Gallery'}
        </Button>
      </div>

      <div className='flex justify-between items-center w-full gap-2 py-2'>
        <div className='flex justify-start items-center gap-2'>
          <TextField
            size='small'
            label='Search'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
              sx: {
                height: '40px',
                fontSize: '12px',
                padding: '5px 10px',
                '.MuiInputBase-input': {
                  padding: '0 5px'
                }
              }
            }}
          ></TextField>
          <Dropdown
            value='Date Added'
            options={['Date Added', 'Date Taken', 'Uploaded By']}
            onChange={handleSizeChange}
            variant='outline'
          />{' '}
          <Button variant='contained'
          startIcon={<i className='ri-filter-3-fill'></i>}>Filters</Button>
        </div>
        <Dropdown value={size} options={['Small', 'Medium', 'Large']} onChange={handleSizeChange} variant='outline' />{' '}
      </div>

      <div className='flex justify-center items-center w-full'>
        {isGalleryShown ? (
          <ImageGallery images={images} size={size} />
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
  {
    src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg',
    alt: 'Image 1',
    date: '2023-01-01',
    selected: false
  },
  {
    src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg',
    alt: 'Image 2',
    date: '2023-01-01',
    selected: false
  },
  {
    src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg',
    alt: 'Image 3',
    date: '2023-01-01',
    selected: false
  },
  {
    src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg',
    alt: 'Image 4',
    date: '2023-05-01',
    selected: false
  },
  {
    src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg',
    alt: 'Image 5',
    date: '2023-05-01',
    selected: false
  },
  {
    src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg',
    alt: 'Image 6',
    date: '2023-02-01',
    selected: false
  },
  {
    src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg',
    alt: 'Image 7',
    date: '2023-02-01',
    selected: false
  },
  {
    src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg',
    alt: 'Image 8',
    date: '2023-09-01',
    selected: false
  },
  {
    src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg',
    alt: 'Image 9',
    date: '2023-01-01',
    selected: false
  },
  {
    src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg',
    alt: 'Image 10',
    date: '2023-01-01',
    selected: false
  },
  {
    src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg',
    alt: 'Image 11',
    date: '2023-01-01',
    selected: false
  },
  {
    src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg',
    alt: 'Image 12',
    date: '2023-01-01',
    selected: false
  }
]
