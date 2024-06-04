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

import type { RowData, SortingState } from '@tanstack/react-table'
import { getSortedRowModel } from '@tanstack/react-table'

import styles from '@core/styles/table.module.css'

// Custom component
import DropDownButton from '@/components/dropDowns/dropDownButton'
import ConfirmationDialog from '../dialogs/confirmation-dialog'
import DropdownWithChip from '../dropDowns/dropDownChip'
import Dropdown from '../dropDowns/dropDown'
import FormDialog from '../dialogBox/formDialog'
import CheckboxListForm from '@/modules/app/appraiser/displayColumnsForm'

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

const Table = ({ data: Data, columns: columnArray, title, onAdd, onActions, buttonName }: any) => {
  // States
  const [open, setOpen] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [data, setData] = useState<any>(Data)
  const [sorting, setSorting] = useState<SortingState>([])
  const [selectedItems, setSelectedItems] = useState(columnArray)

  const handleCheckboxSubmit = (selectedItems:any) => {
    setSelectedItems(selectedItems)
    setOpen(false)

    // Filter the headers array to get only active headers

    const activeHeaders = selectedItems.filter((h:any) => h.active).map((h:any) => h.header)

    // Filter the data array to get objects with headers that are active
    const activeData = columnArray.filter((d:any) => activeHeaders.includes(d.header))

    setSelectedItems(activeData)
  }

  const handleClose = () => {
    setOpen(!open)
  }

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

  // Todo send data to the db
  // console.log('🚀 ~ Table ~ rowSelection:', updatedData)

  function generateColumns(columnConfigurations: any) {
    return columnConfigurations.map((config: any) => {
      const { name, header, type, options, size } = config
      const accessor = name

      const cell = ({ row }: any) => {
        if (type === 'simple') {
          return <Typography>{row.original[name]}</Typography>
        } else if (type === 'DropdownWithChip') {
          return <DropdownWithChip value={row.original[name]} options={options} />
        } else if (type === 'Dropdown') {
          return <Dropdown value={row.original[name]} options={options} />
        } else if (type === 'DND') {
          return (
            <div className='flex justify-start items-center'>
              <RowDragHandleCell rowId={row.id} />
            </div>
          )
        } else if (type === 'ClientDetails') {
          return (
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
        } else if (type === 'DropdownWithChipAndText') {
          return (
            <div className='flex justify-start items-center gap-3'>
              <Typography>{row.original[name]}</Typography>
              {row.original.umpire_status && <DropdownWithChip value={row.original.umpire_status} options={options} />}
            </div>
          )
        } else if (type === 'TextWithTooltip') {
          return row.original[name].length > size ? (
            <Tooltip title={row.original[name]}>
              <Typography
                variant='body1'
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  width: '200px',
                  cursor: 'pointer'
                }}
              >
                {row.original[name]}
              </Typography>
            </Tooltip>
          ) : (
            <Typography>{`${row.original[name]}`}</Typography>
          )
        } else if (type === 'Action') {
          return (
            <div className='flex items-start '>
              <DropDownButton
                buttonLabel='ri-more-2-fill w-5 h-5 ease-in-out duration-500 transition-all'
                onMenuItemClick={onActions}
                menuOptions={options.map((option: any) => ({
                  label: option.label,
                  icon: option.icon,
                  id: row.original.id
                }))}
              />
            </div>
          )
        }

        return null
      }

      return columnHelper.accessor(accessor, {
        header: header,
        cell: cell
      })
    })
  }

  const columnArrays = generateColumns(selectedItems)

  const columns = useMemo(() => columnArrays, [selectedItems])

  // Hooks
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row: any) => row.id,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting
    },
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
          <CardHeader title={title} />
          <div className='flex justify-center items-center gap-2 flex-col w-full sm:flex-row md:w-auto'>
            <TextField id='outlined-basic' label='Search' variant='outlined' fullWidth size='small' />
            <Button
              variant='contained'
              type='submit'
              startIcon={<i className='ri-add-line' />}
              fullWidth
              onClick={onAdd}
            >
              {buttonName ? buttonName : 'Action button'}
            </Button>
            <Button variant='contained' type='submit' fullWidth onClick={() => setOpen(true)}>
              Columns
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

                          <i
                            className='ri-arrow-up-down-line w-3 h-3 ml-2'
                            onClick={header.column.getToggleSortingHandler()}
                          ></i>
                          {[header.column.getIsSorted() as string] ?? null}
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

        <ConfirmationDialog
          open={isOpenDelete}
          setOpen={setIsOpenDelete}
          type='delete-account'
          title='Are you sure you want to delete this row?'
        />
      </Card>

      <FormDialog open={open} onClose={handleClose} dialogTitle='Manage Columns'>
        <CheckboxListForm columns={columnArray} onSubmit={handleCheckboxSubmit} onClose={handleClose} />
      </FormDialog>
    </DndContext>
  )
}

export default Table
