'use client'

import React, { useState } from 'react'

import { Button, InputAdornment, TextField, Typography } from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'

import Dropdown from '@/components/dropDowns/dropDown'
import DNDImage from '@/components/common/dndImage'
import FormDialog from '@/components/dialogBox/formDialog'
import FilterAccordion from '@/components/filters'
import ImageGallery from '@/modules/app/appraiser/photos/imageGallery'
import { images } from '@/data/data'

const Photo: React.FC = () => {
  const [size, setSize] = useState<'Small Size' | 'Medium Size' | 'Large Size'>('Medium Size')
  const [open, setOpen] = useState(false)
  const [openFilter, setOpenFilter] = useState(false)

  const handleClose = () => {
    setOpen(!open)
  }

  const handleCloseFilters = () => {
    setOpenFilter(!openFilter)
  }

  const handleSizeChange = (selectedSize: string) => {
    if (selectedSize === 'Small Size' || selectedSize === 'Medium Size' || selectedSize === 'Large Size') {
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

      <div className='flex justify-between items-center w-full gap-2  flex-wrap'>
        <div className='flex justify-start items-center gap-2 flex-wrap'>
          <TextField
            size='small'
            placeholder='Search'
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
                  padding: '0 5px',
                  '::placeholder': {
                    fontSize: '16px'
                  }
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
        <Dropdown
          value={size}
          options={['Small Size', 'Medium Size', 'Large Size']}
          onChange={handleSizeChange}
          variant='outline'
        />{' '}
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
          onClose={handleCloseFilters}
          onApplyFilter={(item: any) => console.log(item)}
          filtersData={[
            {
              title: 'Date Uploaded',
              filters: [
                { label: 'Today', active: false },
                { label: 'Yesterday', active: false },
                { label: 'Last 7 days', active: false },
                { label: 'Last 30 days', active: false }
              ],
              active: false
            },
            {
              title: 'Uploaded By',
              filters: [
                { label: 'John Deo', active: false },
                { label: 'Madera', active: false },
                { label: 'Rocky', active: false }
              ],
              active: false
            },
            {
              title: 'Tags',
              filters: [
                { label: 'After', active: false },
                { label: 'Below', active: false }
              ],
              active: false
            }
          ]}
        />
      </FormDialog>
    </div>
  )
}

export default Photo
