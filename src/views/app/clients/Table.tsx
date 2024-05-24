'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { Button, Card, Chip, Grid, MenuItem, TablePagination, TextField } from '@mui/material'

import CustomAvatar from '@/@core/components/mui/Avatar'

import { useSettings } from '@/@core/hooks/useSettings'
import { AddClient } from '@/components/dialogBox/apps/apprasialClient/AddClient'

const listData = [
  { companyName: 'Alpha', closed: 1, open: 12, schedule: 2, amount: '$12,300' },
  { companyName: 'Priority', closed: 3, open: 8, schedule: 1, amount: '$8,500' },
  { companyName: 'Rubinsky', closed: 1, open: 12, schedule: 2, amount: '$12,300' },
  { companyName: 'Veterans', closed: 3, open: 8, schedule: 1, amount: '$8,500' },
  { companyName: 'Buccy', closed: 1, open: 12, schedule: 2, amount: '$12,300' },
  { companyName: 'Miller Storm', closed: 3, open: 8, schedule: 1, amount: '$8,500' },
  { companyName: 'AJ', closed: 1, open: 12, schedule: 2, amount: '$12,300' },
  { companyName: 'Builditect', closed: 3, open: 8, schedule: 1, amount: '$8,500' },
  { companyName: 'Zeus', closed: 1, open: 12, schedule: 2, amount: '$12,300' },
  { companyName: 'Spartan', closed: 3, open: 8, schedule: 1, amount: '$8,500' }

  // { companyName: 'Roof Experts', closed: 1, open: 12, schedule: 2, amount: '$12,300' },
  // { companyName: 'Maverick', closed: 3, open: 8, schedule: 1, amount: '$8,500' },
  // { companyName: 'J&K', closed: 3, open: 8, schedule: 1, amount: '$8,500' },
]

const AppraisalClientTable = () => {
  const { settings } = useSettings()
  const [data, setData] = useState(listData)
  const [open, setOpen] = useState(false)

  const router = useRouter()

  const handle = (id: number) => {
    router.push(`appraisal/${id}`)
  }

  const handleInput = (e: any) => {
    const searchValue = e.target.value

    const filteredData = listData.filter(item => item.companyName.toLowerCase().includes(searchValue.toLowerCase()))

    setData(filteredData)
  }

  // Table List data

  const itemData = [
    {
      value: 'Last Week'
    },
    {
      value: 'Last Month'
    },
    {
      value: 'Last Year'
    },
    {
      value: 'Custom Date Range'
    }
  ]

  return (
    <>
      <Grid item xs={12}>
        <div className='flex justify-between w-fulls items-center flex-col md:flex-row gap-4'>
          <div className='w-full  md:w-72'>
            <TextField fullWidth onChange={handleInput} label='Search By Client' size='small' />
          </div>
          <div className='w-full  flex justify-end items-center gap-2 flex-col md:flex-row'>
            <div className='w-full md:w-52'>
              <TextField fullWidth select label='Filter' size='small'>
                {itemData.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <Button
              variant='contained'
              type='submit'
              startIcon={<i className='ri-add-line' />}
              className='is-full sm:is-auto'
              onClick={()=>setOpen(true)}
            >
              Add Client
            </Button>
          </div>
        </div>
      </Grid>
      {data.map((item, index) => (
        <Card key={index} className='my-4' onClick={() => handle(index)}>
          <div
            className={`grid grid-cols-8 p-4 items-center justify-center gap-2  ${
              settings.mode === 'dark' ? 'hover:bg-[#37334C]' : 'hover:bg-[#E5E5EB]'
            }`}
          >
            <div className='col-span-8 md:col-span-3 '>
              <h2>{item.companyName}</h2>
            </div>
            <div className='col-span-4 md:col-span-1'>
              <Chip label={`Open: ${item.open}`} color='success' size='small' variant='tonal' />
            </div>
            <div className='col-span-4 md:col-span-1'>
              <Chip label={`Schedule: ${item.schedule}`} color='warning' size='small' variant='tonal' />
            </div>
            <div className='col-span-4 md:col-span-1'>
              <Chip label={`Closed: ${item.closed}`} color='info' size='small' variant='tonal' />
            </div>
            <div className='col-span-4 md:col-span-1 flex justify-start items-center gap-2'>
              <CustomAvatar size={30} variant='rounded' color='success' skin='light' className='shadow-xs'>
                <i className='ri-money-dollar-circle-line text-success'></i>
              </CustomAvatar>
              <p>{item.amount}</p>
            </div>

            <div className='hidden  md:col-span-1 md:flex justify-end  cursor-pointer'>
              <i className='ri-arrow-right-s-line text-'></i>
            </div>
          </div>
        </Card>
      ))}
      <Grid item xs={12} paddingRight={20} paddingLeft={20}>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component='div'
          className='border-bs'
          count={10}
          rowsPerPage={10}
          page={10}
          onPageChange={() => {}}
        />
      </Grid>
      <AddClient
        open={open}
        onClose={()=>setOpen(false)}
       
      />{' '}
      */
    </>
  )
}

export default AppraisalClientTable