'use client'

import React, { useState } from 'react'

import { Button, InputAdornment, TextField, Typography } from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'

import ImageGallery from '@/components/common/imageGallery'
import Dropdown from '@/components/dropDowns/dropDown'
import DNDImage from '@/components/common/dndImage'
import FormDialog from '@/components/dialogBox/formDialog'
import FilterAccordion from './filters'

const Photo: React.FC = () => {
  const [size, setSize] = useState<'Small' | 'Medium' | 'Large'>('Medium')
  const [open, setOpen] = useState(false)
  const [openFilter, setOpenFilter] = useState(false)

  const handleClose = () => {
    setOpen(!open)
  }

  const handleCloseFilters = () => {
    setOpenFilter(!openFilter)
  }

  const handleSizeChange = (selectedSize: string) => {
    if (selectedSize === 'Small' || selectedSize === 'Medium' || selectedSize === 'Large') {
      setSize(selectedSize)
    }
  }

  return (
    <div className='flex flex-col items-center w-full gap-2'>
      <div className='flex justify-between items-center w-full gap-2  flex-wrap'>
        <Typography variant='h4' className='whitespace-nowrap'>
          Photos & Videos
        </Typography>

        {/* TODO only for test */}
        <Button
          onClick={() => setOpen(!open)}
          variant='contained'
          startIcon={<i className='ri-upload-cloud-2-line'></i>}
        >
          Upload
        </Button>
      </div>

      <div className='flex justify-between items-center w-full gap-2 py-2 flex-wrap'>
        <div className='flex justify-start items-center gap-2 flex-wrap'>
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
          <Button
            variant='contained'
            startIcon={<i className='ri-filter-3-fill'></i>}
            onClick={() => setOpenFilter(!openFilter)}
          >
            Filters
          </Button>
        </div>
        <Dropdown value={size} options={['Small', 'Medium', 'Large']} onChange={handleSizeChange} variant='outline' />{' '}
      </div>

      <div className='flex justify-center items-center w-full '>
        <ImageGallery images={images} size={size} />
      </div>

      {/* Open upload image model  */}

      <FormDialog open={open} onClose={handleClose} dialogTitle='Upload Files' closeButton={true}>
        <DNDImage />
      </FormDialog>

      {/* Open Filters model  */}

      <FormDialog open={openFilter} onClose={handleCloseFilters} dialogTitle='Filters' closeButton={true}>
        <FilterAccordion
          filtersData={[
            {
              title: 'Date Uploaded',
              filters: [
                { label: 'Last 24 hours', active: false },
                { label: 'Last 7 days', active: false },
                { label: 'Last 30 days', active: false }
              ]
            },
            {
              title: 'Uploaded By',
              filters: [
                { label: 'John Deo', active: false },
                { label: 'Madera', active: false },
                { label: 'Rocky', active: false }
              ]
            }
          ]}
        />
      </FormDialog>
    </div>
  )
}

export default Photo

interface Image {
  src: string
  alt: string
  date: string
  time: string
  uploadedBy: string
  selected: boolean
}

const images: Image[] = [
  {
    src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg',
    alt: 'Image 1',
    date: '2023-01-01',
    time: '10:00',
    uploadedBy: 'John Doe',
    selected: false
  },
  {
    src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg',
    alt: 'Image 2',
    date: '2023-01-01',
    time: '11:00',
    uploadedBy: 'Jane Smith',
    selected: false
  },
  {
    src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg',
    alt: 'Image 3',
    date: '2023-01-01',
    time: '12:00',
    uploadedBy: 'Alice Johnson',
    selected: false
  },
  {
    src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg',
    alt: 'Image 4',
    date: '2023-05-01',
    time: '13:00',
    uploadedBy: 'Bob Brown',
    selected: false
  },
  {
    src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg',
    alt: 'Image 5',
    date: '2023-05-01',
    time: '14:00',
    uploadedBy: 'Carol White',
    selected: false
  },
  {
    src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg',
    alt: 'Image 6',
    date: '2023-02-01',
    time: '15:00',
    uploadedBy: 'David Green',
    selected: false
  },
  {
    src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg',
    alt: 'Image 7',
    date: '2023-02-01',
    time: '16:00',
    uploadedBy: 'Eve Black',
    selected: false
  },
  {
    src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg',
    alt: 'Image 8',
    date: '2023-09-01',
    time: '17:00',
    uploadedBy: 'Frank Blue',
    selected: false
  },
  {
    src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg',
    alt: 'Image 9',
    date: '2023-01-01',
    time: '18:00',
    uploadedBy: 'Grace Yellow',
    selected: false
  },
  {
    src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg',
    alt: 'Image 10',
    date: '2023-01-01',
    time: '19:00',
    uploadedBy: 'Hank Purple',
    selected: false
  },
  {
    src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg',
    alt: 'Image 11',
    date: '2023-01-01',
    time: '20:00',
    uploadedBy: 'Ivy Orange',
    selected: false
  },
  {
    src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg',
    alt: 'Image 12',
    date: '2023-01-01',
    time: '21:00',
    uploadedBy: 'Jack Pink',
    selected: false
  }
]
