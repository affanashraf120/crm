'use client'

// React Imports
import { useMemo, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { Avatar, Button, TablePagination, TextField, Tooltip, Typography } from '@mui/material'

// Third-party Imports
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

// Style Imports

import type { RowData } from '@tanstack/react-table'

import styles from '@core/styles/table.module.css'

// Data Imports
import defaultData from './data'

// Custom component
import Dropdown from '@/components/dropDowns/dropDown'
import DropdownWithChip from '@/components/dropDowns/dropDownChip'
import SliderInputModal from '@/components/sliderModal'

// Column Definitions
const columnHelper = createColumnHelper<any>()

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void
  }
}

function transformData(data: any) {
  const dataArray = [data]

  return dataArray.map(item => {
    if (item.status) {
      item.status = JSON.parse(item.status)
    }

    if (item.umpire_status) {
      item.umpire_status = JSON.parse(item.umpire_status)
    }

    const dateFields = ['date_sent', 'date_approved', 'inspection_date', 'date_qb_invoiced', 'date_user_paid']

    dateFields.forEach(field => {
      if (item[field]) {
        const dateString = new Date(item[field]).toISOString()
        const dateOnly = dateString.split('T')[0]

        item[field] = dateOnly
      }
    })

    return item
  })
}

const ClientTable = () => {
  // States
  const [isOpen, setIsOpen] = useState(false)
  const [rowSelection, setRowSelection] = useState<any>({})

  const updatedData = useMemo(() => transformData(rowSelection), [rowSelection])

  // Todo send data to the db
  console.log('🚀 ~ ClientTable ~ rowSelection:', updatedData)

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: '',
        cell: ({ row }) => (
          <svg
            key={row.original.id}
            xmlns='http://www.w3.org/2000/svg'
            width='1.3em'
            height='1.3em'
            viewBox='0 0 256 256'
            className='cursor-grab'
          >
            <path
              fill='currentColor'
              d='M108 60a16 16 0 1 1-16-16a16 16 0 0 1 16 16m56 16a16 16 0 1 0-16-16a16 16 0 0 0 16 16m-72 36a16 16 0 1 0 16 16a16 16 0 0 0-16-16m72 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16m-72 68a16 16 0 1 0 16 16a16 16 0 0 0-16-16m72 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16'
            />
          </svg>
        )
      }),
      columnHelper.accessor('inv', {
        header: 'INV #',
        cell: ({ row }) => <Typography>{`${row.original.inv}`}</Typography>
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => (
          <DropdownWithChip
            value={row.original.status}
            options={[
              { id: 0, value: 'None', color: 'default' },
              { id: 1, value: 'Closed', color: 'info' },
              { id: 2, value: 'Open', color: 'success' },
              { id: 3, value: 'Scheduling Inspection', color: 'default' },
              { id: 4, value: 'Umpire', color: 'primary' }
            ]}
          />
        )
      }),
      columnHelper.accessor('assigned_to', {
        header: 'Assigned To',
        cell: ({ row }) => (
          <Dropdown
            value={row.original.assigned_to}
            options={[
              'John Doe',
              'Jane Smith',
              'Mark Johnson',
              'Emily Brown',
              'Sarah Wilson',
              'Michael Davis',
              'Alex Johnson',
              'Emma Garcia'
            ]}
          />
        )
      }),
      columnHelper.accessor('client_name', {
        header: 'Client Name',
        cell: ({ row }) => (
          <div className='flex items-center justify-between gap-3 group'>
            <div className='flex items-center gap-3'>
              <Avatar alt='John Doe' src='/images/avatars/1.png' className='cursor-pointer bs-[38px] is-[38px]' />
              <div className='flex flex-col'>
                <Typography className='font-medium' color='text.primary'>
                  {row.original.client_name}
                </Typography>
                <Typography variant='body2'>{row.original.email}</Typography>
              </div>
            </div>

            <div className='w-10'>
              <Button
                color='inherit'
                onClick={handleSliderInputModal}
                sx={{
                  padding: '4px',
                  gap: '4px'
                }}
                className='hidden group-hover:flex items-center justify-center transition-all duration-300 ease-in-out'
              >
                {/* <i className='ri-side-bar-fill w-4 h-3.5 rotate-180'></i> */}
                <svg
                  role='graphics-symbol'
                  viewBox='0 0 16 16'
                  fill='currentColor'
                  width='12'
                  height='12'
                  className='display: block; flex-shrink: 0;'
                >
                  <path d='M2.14 14.45H13.85C15.33 14.45 16.09 13.69 16.09 12.23V3.91C16.09 2.45 15.33 1.69 13.85 1.69H2.14C0.67 1.69 -0.10 2.45 -0.10 3.91V12.23C-0.10 13.69 0.67 14.45 2.14 14.45ZM2.22 13.11C1.59 13.11 1.24 12.78 1.24 12.12V4.02C1.24 3.36 1.59 3.03 2.22 3.03H13.77C14.40 3.03 14.75 3.36 14.75 4.02V12.12C14.75 12.78 14.40 13.11 13.77 13.11H2.22ZM8.52 12.11H13.22C13.60 12.11 13.76 11.95 13.76 11.56V4.58C13.76 4.19 13.60 4.02 13.22 4.02H8.52C8.14 4.02 7.99 4.19 7.99 4.58V11.56C7.99 11.95 8.14 12.11 8.52 12.11Z'></path>
                </svg>
                open
              </Button>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('claim_no', {
        header: 'Claim No',
        cell: ({ row }) => <Typography>{row.original.claim_no}</Typography>
      }),
      columnHelper.accessor('date_sent', {
        header: 'Date Sent',
        cell: ({ row }) => <Typography>{row.original.date_sent}</Typography>
      }),
      columnHelper.accessor('carrier', {
        header: 'Carrier',
        cell: ({ row }) => (
          <Dropdown
            value={row.original.carrier}
            options={[
              'Michael',
              'Jennifer',
              'David',
              'Sarah',
              'John',
              'Emily',
              'Ashley',
              'Robert',
              'Amanda',
              'William',
              'Melissa'
            ]}
          />
        )
      }),
      columnHelper.accessor('oa_name', {
        header: 'OA Name',
        cell: ({ row }) => <Typography>{row.original.oa_name}</Typography>
      }),
      columnHelper.accessor('oa_email', {
        header: 'OA Email',
        cell: ({ row }) => <Typography>{row.original.oa_email}</Typography>
      }),
      columnHelper.accessor('oa_phone_no', {
        header: 'OA Phone No',
        cell: ({ row }) => <Typography>{row.original.oa_phone_no}</Typography>
      }),
      columnHelper.accessor('umpire_name', {
        header: 'Umpire Name',
        cell: ({ row }) => (
          <div className='flex justify-start items-center gap-3'>
            <Typography>{row.original.umpire_name}</Typography>
            <DropdownWithChip
              value={row.original.umpire_status}
              options={[
                { id: 0, value: 'None', color: 'default' },
                { id: 1, value: 'Initiated', color: 'success' },
                { id: 2, value: 'W9 & Invoice Received', color: 'info' },
                { id: 3, value: 'Payment Sent', color: 'warning' },
                { id: 4, value: 'Try To Schedule', color: 'primary' },
                { id: 5, value: 'Inspection Schedule', color: 'info' },
                { id: 6, value: 'Roof Bought', color: 'warning' },
                { id: 7, value: 'Roof Denied', color: 'success' },
                { id: 8, value: 'Inspection Schedule', color: 'primary' }
              ]}
            />
          </div>
        )
      }),
      columnHelper.accessor('umpire_email', {
        header: 'Umpire Email',
        cell: ({ row }) => <Typography>{row.original.umpire_email}</Typography>
      }),
      columnHelper.accessor('umpire_phone_no', {
        header: 'Umpire Phone No',
        cell: ({ row }) => <Typography>{row.original.umpire_phone_no}</Typography>
      }),
      columnHelper.accessor('city', {
        header: 'City',
        cell: ({ row }) => (
          <Dropdown
            value={row.original.city}
            options={[
              'Anytown',
              'Othertown',
              'Anycity',
              'Anothercity',
              'Newcity',
              'Yetanothercity',
              'Metropolitan City',
              'Capital City'
            ]}
          />
        )
      }),
      columnHelper.accessor('address', {
        header: 'Address',
        cell: ({ row }) =>
          row.original.address.length > 30 ? (
            <Tooltip title={row.original.address}>
              <Typography
                variant='body1'
                style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '200px' }}
              >
                {row.original.address}
              </Typography>
            </Tooltip>
          ) : (
            <Typography>{`${row.original.address}`}</Typography>
          )
      }),
      columnHelper.accessor('appraisal_amt', {
        header: 'Appraisal Amt',
        cell: ({ row }) => <Typography>{`$${row.original.appraisal_amt}`}</Typography>
      }),
      columnHelper.accessor('percentage', {
        header: 'Percentage',
        cell: ({ row }) => <Typography>{`${row.original.percentage}%`}</Typography>
      }),
      columnHelper.accessor('date_approved', {
        header: 'Date Approved',
        cell: ({ row }) => <Typography>{row.original.date_approved}</Typography>
      }),
      columnHelper.accessor('inspection_date', {
        header: 'Inspection Date',
        cell: ({ row }) => <Typography>{row.original.inspection_date}</Typography>
      }),
      columnHelper.accessor('turnaround', {
        header: 'Turnaround',
        cell: ({ row }) => <Typography>{row.original.turnaround}</Typography>
      }),
      columnHelper.accessor('comm_amt', {
        header: 'Comm Amt',
        cell: ({ row }) => <Typography>{`$${row.original.comm_amt}`}</Typography>
      }),
      columnHelper.accessor('notes', {
        header: 'Notes',
        cell: ({ row }) =>
          row.original.address.length > 30 ? (
            <Tooltip title={row.original.notes}>
              <Typography
                variant='body1'
                style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '200px' }}
              >
                {row.original.notes}
              </Typography>
            </Tooltip>
          ) : (
            <Typography>{`${row.original.notes}`}</Typography>
          )
      }),
      columnHelper.accessor('date_qb_invoiced', {
        header: 'Date QB Invoiced',
        cell: ({ row }) => <Typography>{row.original.date_qb_invoiced}</Typography>
      }),
      columnHelper.accessor('date_user_paid', {
        header: 'Date User Paid',
        cell: ({ row }) => <Typography>{row.original.date_user_paid}</Typography>
      })
    ],
    []
  )

  // Hooks
  const table = useReactTable({
    data: defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: undefined
  })

  const handleSliderInputModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Card>
      <div className='flex justify-between items-start md:items-center pe-5 flex-col px-2 md:flex-row mb-2 text-left'>
        <CardHeader title='Alpha Appraisals (10% or $250 min)' />
        <div className='flex justify-between px-4 md:px-0 md:justify-end items-start w-full flex-col sm:flex-row md:gap-2 gap-4 '>
          <TextField id='outlined-basic' label='Search' variant='outlined' size='small' sx={{ marginRight: '4px' }} />
          <Button
            variant='contained'
            type='submit'
            onClick={handleSliderInputModal}
            startIcon={<i className='ri-add-line' />}
          >
            Add New Appraisal
          </Button>
        </div>
      </div>
      <div className='overflow-x-auto'>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table
              .getRowModel()
              .rows.slice(0, 10)
              .map(row => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => {
                      return (
                        <td key={cell.id} className={styles.cellWithInput}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
      <div className='w-full px-16'>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component='div'
          className='border-bs'
          count={10}
          rowsPerPage={10}
          page={10}
          onPageChange={() => {}}
        />
      </div>

      <SliderInputModal
        dir='ltr'
        open={isOpen}
        setOpen={setIsOpen}
        clientName='Alpha'
        setRowSelection={setRowSelection}
      />
    </Card>
  )
}

export default ClientTable
