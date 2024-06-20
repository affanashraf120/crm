'use client'

import React, { useState } from 'react'

import { Button, InputAdornment, TextField, Typography } from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'

import DNDImage from '@/components/common/dndImage'
import FormDialog from '@/components/dialogBox/formDialog'
import Dropdown from '@/components/dropDowns/dropDown'
import MultiSelectDropdown from '@/components/dropDowns/multifiltercheckbox'
import Folder from '@/modules/app/appraiser/documents/Folder'
import CreateFolder from '@/modules/app/appraiser/documents/createFolder'
import FilterAccordion from '@/components/filters'
import DateRangePicker from '@/components/calender'

const Documents: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [openFilter, setOpenFilter] = useState(false)
  const [openCreateFolder, setOpenCreateFolder] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState(filters)
  const [count, setCount] = useState(0)
  const [typeFilter, setTypeFilter] = useState(filtersData)
  const [isOpenRangeDialog, setIsOpenRangeDialog] = useState(false)

  console.log('🚀 ~ selectedFilters:', selectedFilters)

  const handleSearchChange = (event: any) => {
    const query = filters.filter(filter => filter.label.toLowerCase().includes(event.target.value.toLowerCase()))

    setFilter(query)
    setSearchQuery(event.target.value)
  }

  const handleClose = () => {
    setOpen(!open)
  }

  const handleFoldersFilter = (item: string[]) => {
    setSelectedFilters(item)

    const query = filters.filter(filter => item.some(i => filter.label.toLowerCase().includes(i.toLowerCase())))

    if (query.length === 0) {
      setFilter(filters)
    } else {
      setFilter(query)
    }
  }

  const handleCloseCreateFolder = () => {
    setOpenCreateFolder(!openCreateFolder)
  }

  const handleFilters = (item: any) => {
    setOpenFilter(!openFilter)
    setTypeFilter(item)

    let activeCount = 0

    item.forEach((item: any) => {
      item.filters.forEach((filter: any) => {
        if (filter.active) {
          activeCount++
        }
      })
    })

    setCount(activeCount)
    console.log('🚀 ~ handleFilters ~ item:', item)
  }


  const handleSort = (item:any) => {
    console.log("🚀 ~ handleSort ~ item:", item)

    if(item === 'Custom'){
      setIsOpenRangeDialog(!isOpenRangeDialog)
    }
  }


  return (
    <div className='flex flex-col items-center w-full'>
      {/* top bar in this component */}
      <div className='flex justify-between items-center w-full gap-2 flex-wrap'>
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

      {/* filter bar in this component */}
      <div className='flex justify-between items-center w-full gap-2 py-2 flex-wrap'>
        <div className='flex justify-start items-center gap-2 flex-wrap'>
          <TextField
            size='small'
            label='Search'
            value={searchQuery}
            onChange={handleSearchChange}
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
            value='All'
            options={['All', 'Today', 'Yesterday', 'Last Week', 'Last Month', 'Custom']}
            onChange={handleSort}
            variant='outline'
          />
          <MultiSelectDropdown
            onselect={handleFoldersFilter}
            options={[
              { label: 'Email Documents', active: false },
              { label: 'Invoice', active: false },
              { label: 'Job Paperwork', active: false },
              { label: 'Roof Report', active: false },
              { label: 'others', active: false }
            ]}
          />

          <div className='relative'>
            {count ? (
              <span className='absolute -top-3 right-1 z-10 border border-textPrimary bg-primary w-5 h-5 text-[10px] rounded-full flex justify-center items-center'>
                {count}
              </span>
            ) : null}

            <Button
              variant='contained'
              startIcon={<i className='ri-filter-3-fill'></i>}
              onClick={() => setOpenFilter(!openFilter)}
              sx={{ paddingLeft: '16px', paddingRight: '16px', whiteSpace: 'nowrap' }}
            >
              Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Table component */}
      <Folder filters={filter} />

      {/* Dialog boxes */}
      <FormDialog open={open} onClose={handleClose} dialogTitle='Upload Files' closeButton={true}>
        <DNDImage />
      </FormDialog>

      <FormDialog
        open={openCreateFolder}
        onClose={handleCloseCreateFolder}
        dialogTitle='Create New Folder'
        closeButton={true}
        dialogSize='20%'
      >
        <CreateFolder onClose={handleCloseCreateFolder} />
      </FormDialog>

      <FormDialog open={openFilter} onClose={() => setOpenFilter(!openFilter)} dialogTitle='Filters' closeButton={true}>
        <FilterAccordion onApplyFilter={handleFilters} filtersData={typeFilter} />
      </FormDialog>


      <FormDialog open={isOpenRangeDialog} onClose={() => setIsOpenRangeDialog(!isOpenRangeDialog)} dialogTitle='Set a Custom Range' closeButton={true} >
        <DateRangePicker name='custom_date_range' onSave={() => setIsOpenRangeDialog(!isOpenRangeDialog)} classes='!flex justify-center items-center w-full gap-2' label='To' buttonType='button'/>
      </FormDialog>


    </div>
  )
}

export default Documents

const filters = [
  {
    label: 'Email Documents',
    files: [
      { name: 'abd.pdf', uploaded_by: 'john deo', last_updated: '12/1/2024 20:00 AM', active: false, size: '1.2 MB' },
      { name: 'xyz.docs', uploaded_by: 'jane doe', last_updated: '12/2/2024 21:00 AM', active: false, size: '2.3 MB' }
    ],
    select: false
  },
  {
    label: 'Invoice',
    files: [
      { name: 'meeting1.docs', uploaded_by: 'alice smith', last_updated: '12/3/2024 01:00 AM', active: false, size: '1.8 MB' },
      { name: 'meeting2.pdf', uploaded_by: 'bob johnson', last_updated: '12/4/2024 03:00 AM', active: false, size: '3.2 MB' },
      { name: 'meeting1.docs', uploaded_by: 'alice smith', last_updated: '12/3/2024 07:00 AM', active: false, size: '1.8 MB' },
      { name: 'meeting2.pdf', uploaded_by: 'bob johnson', last_updated: '12/4/2024 09:00 AM', active: false, size: '3.2 MB' },
      { name: 'meeting1.docs', uploaded_by: 'alice smith', last_updated: '12/3/2024 10:00 AM', active: false, size: '1.8 MB' },
      { name: 'meeting2.pdf', uploaded_by: 'bob johnson', last_updated: '12/4/2024 12:00 AM', active: false, size: '3.2 MB' }
    ],
    select: false
  },
  {
    label: 'Job Paperwork',
    files: [
      { name: 'abd.docs', uploaded_by: 'john deo', last_updated: '12/1/2024 08:00 AM', active: false, size: '2.0 MB' },
      { name: 'xyz.pdf', uploaded_by: 'jane doe', last_updated: '12/2/2024 09:00 AM', active: false, size: '1.5 MB' }
    ],
    select: false
  },
  {
    label: 'Roof Report',
    files: [
      { name: 'meeting1.pdf', uploaded_by: 'alice smith', last_updated: '12/3/2024 11:00 AM', active: false, size: '2.7 MB' },
      { name: 'meeting2.pdf', uploaded_by: 'bob johnson', last_updated: '12/4/2024 11:00 AM', active: false, size: '3.1 MB' }
    ],
    select: false
  },
  {
    label: 'other',
    files: [
      { name: 'meeting1.pdf', uploaded_by: 'alice smith', last_updated: '12/3/2024 14:00 AM', active: false, size: '2.7 MB' },
      { name: 'meeting2.pdf', uploaded_by: 'bob johnson', last_updated: '12/4/2024 11:00 AM', active: false, size: '3.1 MB' }
    ],
    select: false
  }
]

const filtersData = [
  {
    title: 'File Type',
    filters: [
      { label: 'Docsx', active: false },
      { label: 'Pdf', active: false }
    ]
  }
]
