'use client'

import React, { useState } from 'react'

import { Button, Card, Chip, Grid, InputAdornment, MenuItem, TablePagination, TextField } from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'

import CustomAvatar from '@/@core/components/mui/Avatar'
import { useSettings } from '@/@core/hooks/useSettings'

const ListViewTable = ({ clickable, actionButton, handleAction, onActions, data: listData }: any) => {
  const { settings } = useSettings()
  const [data, setData] = useState(listData)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleInput = (e: any) => {
    const searchValue = e.target.value

    const filteredData = listData.filter((item: any) =>
      item.companyName.toLowerCase().includes(searchValue.toLowerCase())
    )

    setData(filteredData)
  }

  const handleChangePage = (newPage: any, page: number) => {
    setPage(page)
  }

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const itemData = [
    { value: 'Last Week' },
    { value: 'Last Month' },
    { value: 'Last Year' },
    { value: 'Custom Date Range' }
  ]

  return (
    <>
      <Grid item xs={12}>
        <div className='flex justify-between w-fulls items-center flex-col md:flex-row gap-4'>
          <div className='w-full  md:w-72'>
            <TextField
              fullWidth
              onChange={handleInput}
              placeholder='Search...'
              size='small'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: {
                  height: '38px',
                  fontSize: '12px',
                  padding: '5px 10px',
                  '.MuiInputBase-input': {
                    padding: '0 5px'
                  }
                }
              }}
            />
          </div>
          <div className='w-full  flex justify-start md:justify-end items-center gap-2 flex-wrap md:flex-nowrap'>
            <div className='w-full md:w-52'>
              <TextField fullWidth select label='Filter' size='small'>
                {itemData.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            {actionButton && (
              <Button
                variant='contained'
                type='submit'
                startIcon={<i className='ri-add-line' />}
                className='is-full sm:is-auto'
                onClick={handleAction}
              >
                Add Client
              </Button>
            )}
          </div>
        </div>
      </Grid>
      {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item: any, index: any) => (
        <Card
          key={index}
          className={`my-4 ${clickable ? 'cursor-pointer' : 'cursor-default'}`}
          onClick={() => {
            if (clickable) {
              onActions(item.companyName)
            }
          }}
        >
          <div
            className={`grid grid-cols-8 p-4 items-center justify-center gap-2 ${
              settings.mode === 'dark' ? 'hover:bg-[#37334C]' : 'hover:bg-[#E5E5EB]'
            }`}
          >
            <div className={`col-span-8 md:col-span-3 ${!clickable && 'md:col-span-4'} `}>
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
            {clickable && (
              <div className='hidden  md:col-span-1 md:flex justify-end  cursor-pointer'>
                <i className='ri-arrow-right-s-line text-'></i>
              </div>
            )}
          </div>
        </Card>
      ))}
      <Grid item xs={12} paddingRight={20} paddingLeft={20}>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component='div'
          className='border-bs'
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
    </>
  )
}

export default ListViewTable
