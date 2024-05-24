'use client'

// React Imports
import { useMemo, useState } from 'react'

import type {
  ComponentType,
  CSSProperties,
  JSXElementConstructor,
  Key,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal
} from 'react'

// needed for table body level scope DnD setup
import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

// needed for row & cell level scope DnD setup
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

// MUI Imports
import { Avatar, Button, IconButton, TablePagination, TextField, Tooltip, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

// Third-party Imports
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'

// Style Imports

import type { RowData } from '@tanstack/react-table'

import styles from '@core/styles/table.module.css'

// Custom component
import Dropdown from '@/components/dropDowns/dropDown'
import DropDownButton from '@/components/dropDowns/dropDownButton'
import DropdownWithChip from '@/components/dropDowns/dropDownChip'
import { ActionsDialog } from '@/components/dialogBox/deleteDialogBox'
import FormDrawer from '@/components/formDrawer/formDrawer'

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

// Cell Component
const RowDragHandleCell = ({ rowId }: { rowId: string }) => {
  const { attributes, listeners } = useSortable({
    id: rowId
  })

  return (
    <span {...attributes} {...listeners}>
      <IconButton>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='1.3em'
          height='1.3em'
          viewBox='0 0 256 256'
          className='cursor-grab w-5 h-5'
        >
          <path
            fill='currentColor'
            d='M108 60a16 16 0 1 1-16-16a16 16 0 0 1 16 16m56 16a16 16 0 1 0-16-16a16 16 0 0 0 16 16m-72 36a16 16 0 1 0 16 16a16 16 0 0 0-16-16m72 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16m-72 68a16 16 0 1 0 16 16a16 16 0 0 0-16-16m72 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16'
          />
        </svg>
      </IconButton>
    </span>
  )
}

// Row Component
const DraggableRow = ({ row }: { row: any }) => {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id
  })

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: 'relative'
  }

  return (
    <tr ref={setNodeRef} style={style}>
      {row.getVisibleCells().map(
        (cell: {
          id: Key | null | undefined
          column: {
            columnDef: {
              cell:
                | string
                | number
                | boolean
                | ComponentType<any>
                | ReactElement<any, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | PromiseLikeOfReactNode
                | null
                | undefined
            }
          }
          getContext: () => any
        }) => (
          <td key={cell.id} className={styles.cellWithInput}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        )
      )}
    </tr>
  )
}

const ClientTable = ({ defaultData }: any) => {
  // States
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [data, setData] = useState<any>(defaultData)
  const [rowSelection, setRowSelection] = useState<any>({})

  const dataIds = useMemo(() => data?.map(({ id }: { id: string }) => id), [data])

  // reorder rows after drag & drop
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (active && over && active.id !== over.id) {
      setData((data: any[]) => {
        const oldIndex = dataIds.indexOf(active.id)
        const newIndex = dataIds.indexOf(over.id)

        return arrayMove(data, oldIndex, newIndex)
      })
    }
  }

  const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}))

  const updatedData = useMemo(() => transformData(rowSelection), [rowSelection])

  const handleMenuItemClick = (menuItem: any) => {
    if (menuItem?.label === 'Edit') {
      setIsOpen(!isOpen)
    } else if (menuItem?.label === 'Delete') {
      setIsOpenDelete(!isOpenDelete)
    }
  }

  // Todo send data to the db
  console.log('🚀 ~ ClientTable ~ rowSelection:', updatedData)

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: '',
        cell: ({ row }) => (
          <div className='flex justify-center items-center'>
            <RowDragHandleCell rowId={row.id} />
          </div>
        )
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex justify-center items-center'>
            <div className='flex items-center '>
              <DropDownButton
                buttonLabel='ri-more-2-fill w-5 h-5 rotate-90 ease-in-out duration-500 transition-all'
                onMenuItemClick={handleMenuItemClick}
                menuOptions={[
                  { label: 'Delete', icon: 'ri-delete-bin-7-line ', id: row.original.id },
                  { label: 'Edit', icon: 'ri-pencil-line', id: row.original.id }
                ]}
              />
            </div>
          </div>
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
            {row.original.umpire_status && 
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
            }
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
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: undefined,
    getRowId: row => row.id,
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10
      }
    }
  })

  const handleFormDrawer = () => {
    setIsOpen(!isOpen)
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <Card>
        <div className='flex justify-between items-start md:items-center flex-col px-2 md:flex-row mb-2 text-left w-full'>
          <CardHeader title='Alpha Appraisals (10% or $250 min)' />
          <div className='flex justify-center items-center gap-2 flex-col w-full sm:flex-row md:w-auto'>
            <TextField id='outlined-basic' label='Search' variant='outlined' fullWidth size='small' />
            <Button
              variant='contained'
              type='submit'
              onClick={handleFormDrawer}
              startIcon={<i className='ri-add-line' />}
              fullWidth
            >
              Add New Appraisal
            </Button>
          </div>
        </div>
        {table.getFilteredRowModel().rows.length === 0 ? (
          <table className={styles.table}>
            <tbody>
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className='text-center w-full'>
                  No data available
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <>
            <div className='overflow-x-auto'>
              <table className={styles.table}>
                <thead>
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <th key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
                    {table
                      .getRowModel()
                      .rows.slice(0, table.getState().pagination.pageSize)
                      .map(row => (
                        <DraggableRow key={row.id} row={row} />
                      ))}
                  </SortableContext>
                </tbody>
              </table>
            </div>
            <div className='w-full px-16'>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component='div'
                className='border-bs'
                count={table.getFilteredRowModel().rows.length}
                rowsPerPage={table.getState().pagination.pageSize}
                page={table.getState().pagination.pageIndex}
                onPageChange={(_, page) => {
                  table.setPageIndex(page)
                }}
                onRowsPerPageChange={e => table.setPageSize(Number(e.target.value))}
              />
            </div>
          </>
        )}

        <FormDrawer
          dir='ltr'
          open={isOpen}
          setOpen={setIsOpen}
          clientName='Alpha'
          setRowSelection={setRowSelection}
        />

        <ActionsDialog
          open={isOpenDelete}
          onClose={() => setIsOpenDelete(false)}
          title='Are you sure you want to delete this row?'
          actions={[
            { label: 'Delete', onClick: () => setIsOpenDelete(false), color: 'error' }, // todo add delete functionality
            { label: 'Cancel', onClick: () => setIsOpenDelete(false), color: 'inherit' }
          ]}
        />
      </Card>
    </DndContext>
  )
}

export default ClientTable
