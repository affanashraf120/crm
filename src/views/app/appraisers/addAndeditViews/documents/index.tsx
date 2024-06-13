'use client'

import React, { useState } from 'react'

import { Button, InputAdornment, TextField, Typography } from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'

import DNDImage from '@/components/common/dndImage'
import FormDialog from '@/components/dialogBox/formDialog'
import Dropdown from '@/components/dropDowns/dropDown'
import MultiSelectDropdown from '@/components/dropDowns/multifiltercheckbox'
import Folder from '@/modules/app/appraiser/documents/Folder'

// import ImageGallery from '@/components/common/imageGallery'

const Documents: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [openFilter, setOpenFilter] = useState(false)
  const [openCreateFolder, setOpenCreateFolder] = useState(false)
  const [createFolder, setCreateFolder] = useState('')
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  console.log('🚀 ~ selectedFilters:', selectedFilters)

  const handleClose = () => {
    setOpen(!open)
  }

  const handleFilters = (item: any) => {
    setSelectedFilters(item)
  }

  const handleCloseCreateFolder = () => {
    setOpenCreateFolder(!openCreateFolder)
  }

  return (
    <div className='flex flex-col items-center w-full'>
      <div className='flex justify-between items-center w-full gap-2 flex-col md:flex-row'>
        <Typography variant='h4' className='whitespace-nowrap'>
          Documents
        </Typography>

        {/* TODO only for test */}
        <div className='flex justify-center items-center gap-2'>
          <Button
            onClick={() => setOpenCreateFolder(!openCreateFolder)}
            variant='contained'
            startIcon={<i className='ri-add-line'></i>}
          >
            Create Folder
          </Button>
          <Button
            onClick={() => setOpen(!open)}
            variant='contained'
            startIcon={<i className='ri-upload-cloud-2-line'></i>}
          >
            Upload
          </Button>
        </div>
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
            onChange={(e: any) => console.log(e)}
            variant='outline'
          />
          <MultiSelectDropdown
            onselect={handleFilters}
            options={[
              { label: 'Account Executive', active: false },
              { label: 'Sales development rep', active: false },
              { label: 'System Administrator', active: false },
              { label: 'Standard User', active: false },
              { label: 'Customer Community User', active: false },
              { label: 'Read Only', active: false }
            ]}
          />
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

      <Folder />

      <FormDialog open={open} onClose={handleClose} dialogTitle='Upload Files' closeButton={true}>
        <DNDImage />
      </FormDialog>

      <FormDialog
        open={openCreateFolder}
        onClose={handleCloseCreateFolder}
        dialogTitle='Create New Folder'
        closeButton={true}
        dialogSize='25%'
      >
        <TextField
          placeholder='Folder Name...'
          variant='standard'
          fullWidth
          onChange={(e: any) => setCreateFolder(e.target.value)}
        />
        <div className='py-4 flex justify-between items-center'>
          <Button variant='outlined' color='inherit' onClick={() => setCreateFolder('')}>
            Clear
          </Button>
          <Button
            variant='contained'
            onClick={() => {
              console.log(createFolder)
              handleCloseCreateFolder()
            }}
          >
            Apply
          </Button>
        </div>
      </FormDialog>
    </div>
  )
}

export default Documents
