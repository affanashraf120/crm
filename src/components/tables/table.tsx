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
import { Button, IconButton, TablePagination, TextField, Typography } from '@mui/material'
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
import { ActionsDialog } from '@/components/dialogBox/deleteDialogBox'
import DropDownButton from '@/components/dropDowns/dropDownButton'

// Column Definitions
const columnHelper = createColumnHelper<any>()

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void
  }
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

const Table = ({ defaultData, columnArray, handleActions, RowDragRows, tableTitle,actionButton }: any) => {
  // States
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [data, setData] = useState<any>(defaultData)

  // const [rowSelection, setRowSelection] = useState<any>({})

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

  // const updatedData = useMemo(() => transformData(rowSelection), [rowSelection])

  const handleActionsRow = (menuItem: any) => {
    if (menuItem?.label === 'Edit') {
      setIsOpen(!isOpen)
    } else if (menuItem?.label === 'Delete') {
      setIsOpenDelete(!isOpenDelete)
    }
  }

  // Todo send data to the db
  // console.log('🚀 ~ Table ~ rowSelection:', updatedData)

  const columnArrays = columnArray?.map((item: any) =>
    columnHelper.accessor(item.name, {
      header: item.header,
      cell: ({ row }) => <Typography>{`${row.original[item.name]}`}</Typography>
    })
  )

  const RowDragColumn = columnHelper.accessor('id', {
    header: '',
    cell: ({ row }) => (
      <div className='flex justify-start items-center'>
        <RowDragHandleCell rowId={row.id} />
      </div>
    )
  })

  const handleActionColumn = columnHelper.accessor('action', {
    header: 'Action',
    cell: ({ row }) => (
      <div className='flex items-start '>
        <DropDownButton
          buttonLabel='ri-more-2-fill w-5 h-5  ease-in-out duration-500 transition-all'
          onMenuItemClick={handleActionsRow}
          menuOptions={[
            { label: 'Delete', icon: 'ri-delete-bin-7-line ', id: row.original.id },
            { label: 'Edit', icon: 'ri-pencil-line', id: row.original.id }
          ]}
        />
      </div>
    )
  })

  if (RowDragRows) {
    columnArrays.splice(0, 0, RowDragColumn)
  }

  if (handleActions) {
    columnArrays.splice(4, 0, handleActionColumn)
  }

  const columns = useMemo(() => columnArrays, [])

  // Hooks
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row: any) => row.id,
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10
      }
    }
  })

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <Card>
        <div className='flex justify-between items-start md:items-center flex-col px-2 md:flex-row mb-2 text-left w-full'>
          <CardHeader title={tableTitle} />
          <div className='flex justify-center items-center gap-2 flex-col w-full sm:flex-row md:w-auto'>
            <TextField id='outlined-basic' label='Search' variant='outlined' fullWidth size='small' />
            <Button variant='contained' type='submit' startIcon={<i className='ri-add-line' />} fullWidth onClick={actionButton}>
              Action Button
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

export default Table
