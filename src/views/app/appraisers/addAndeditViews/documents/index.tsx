'use client'

import React, { useState } from 'react'

import { Button, InputAdornment, TextField, Typography } from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'

import DNDImage from '@/components/common/dndImage'
import FormDialog from '@/components/dialogBox/formDialog'
import Dropdown from '@/components/dropDowns/dropDown'

// import ImageGallery from '@/components/common/imageGallery'

const Documents: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false)

  const handleClose = () => {
    setOpen(!open)
  }


  return (
    <div className='flex flex-col items-center w-full'>
      <div className='flex justify-between items-center w-full gap-2 flex-col md:flex-row'>
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
            onChange={(e:any)=>console.log(e)}
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
        {/* <Dropdown value={size} options={['Small', 'Medium', 'Large']} onChange={handleSizeChange} variant='outline' />{' '} */}
      </div>

      <FormDialog open={open} onClose={handleClose} dialogTitle='Upload Files' closeButton={true}>
        <DNDImage />
      </FormDialog>
    </div>
  )
}

export default Documents
