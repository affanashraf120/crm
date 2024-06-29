'use client'

import { useState } from 'react'

import {
  Button,
  Card,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  TablePagination,
  TextField,
  Tooltip
} from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'

import CustomAvatar from '@/@core/components/mui/Avatar'
import { useSettings } from '@/@core/hooks/useSettings'
import DateRangePicker from '../calender'
import FormDialog from '../dialogBox/formDialog'
import Dropdown from '../dropDowns/dropDown'

const ListViewTable = ({ clickable, actionButton, onActions, data: listData, onClickRow }: any) => {
  const { settings } = useSettings()
  const [data, setData] = useState(listData)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [isOpenRangeDialog, setIsOpenRangeDialog] = useState(false)

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

  const handleSort = (item: any) => {
    console.log('🚀 ~ handleSort ~ item:', item)

    if (item === 'Custom') {
      setIsOpenRangeDialog(!isOpenRangeDialog)
    }
  }

  return (
    <>
      <Grid item xs={12}>
        <div className='flex justify-between w-fulls items-center flex-col md:flex-row gap-4'>
          <div className='w-full  md:w-72'>
            <TextField
              fullWidth
              onChange={handleInput}
              placeholder='Search'
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
                    padding: '0 5px',
                    '::placeholder': {
                      fontSize: '16px'
                    }
                  }
                }
              }}
            />
          </div>
          <div className='w-full  flex justify-start md:justify-end items-center gap-2 flex-wrap md:flex-nowrap'>
            <div className='w-full md:w-52'>
              <Dropdown
                value='All'
                options={['All', 'Last Week', 'Last Month', 'Last Year']}
                onChange={handleSort}
                button={true}
                variant='outline'
              />
            </div>
            {actionButton && (
              <Button
                variant='contained'
                type='submit'
                startIcon={<i className='ri-add-line font-bold w-5 h-5' />}
                className='is-full sm:is-auto'
                onClick={onActions}
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
          className={`my-4 px-7 w-full ${clickable ? 'cursor-pointer' : 'cursor-default'} ${
            settings.mode === 'dark' ? 'hover:bg-[#37334C]' : 'hover:bg-[#E5E5EB]'
          }`}
        >
          <div className={`flex py-4 flex-col md:flex-row items-center justify-start gap-2 w-full`}>
            <div
              className='grid grid-cols-12 w-full gap-2'
              onClick={() => {
                if (clickable) {
                  onClickRow(item.companyName)
                }
              }}
            >
              <div className={`col-span-12 md:col-span-8  `}>
                <h2>{item.companyName}</h2>
              </div>

              <div className='col-span-12 md:col-span-1'>
                {item.open && <Chip label={`Open: ${item.open}`} color='success' size='small' variant='tonal' />}
              </div>
              <div className='col-span-12 md:col-span-1'>
                {item.schedule && (
                  <Chip label={`Schedule: ${item.schedule}`} color='warning' size='small' variant='tonal' />
                )}
              </div>
              <div className='col-span-12 md:col-span-1'>
                {item.closed && <Chip label={`Closed: ${item.closed}`} color='info' size='small' variant='tonal' />}
              </div>
              <div className='col-span-12 md:col-span-1 flex justify-start items-center gap-2'>
                <CustomAvatar size={30} variant='rounded' color='success' skin='light' className='shadow-xs'>
                  <i className='ri-money-dollar-circle-line text-success'></i>
                </CustomAvatar>
                <p>{item.amount}</p>
              </div>
            </div>

            {clickable && (
              <div className='flex justify-start gap-2 items-start md:ps-4 md:pe-2 w-full md:w-auto md:justify-end md:items-center'>
                {clickable.map((item: any, index: any) => (
                  <Tooltip key={index} title={item.title}>
                    <IconButton onClick={() => onActions(item.title)}>
                      <i className={`${item.icon}`}></i>
                    </IconButton>
                  </Tooltip>
                ))}
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

      <FormDialog
        open={isOpenRangeDialog}
        onClose={() => setIsOpenRangeDialog(!isOpenRangeDialog)}
        dialogTitle='Set a Custom Range'
        closeButton={true}
      >
        <DateRangePicker
          name='custom_date_range'
          onSave={() => setIsOpenRangeDialog(!isOpenRangeDialog)}
          classes='!flex justify-center items-center w-full gap-2'
          label='To'
          buttonType='button'
        />
      </FormDialog>
    </>
  )
}

export default ListViewTable
