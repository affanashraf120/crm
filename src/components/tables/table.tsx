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
import { Avatar, Button, IconButton, Stack, TablePagination, TextField, Tooltip, Typography } from '@mui/material'
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
import Dropdown from '../dropDowns/dropDown'
import DropdownWithChip from '../dropDowns/dropDownChip'
import ActionsDropDown from '../dropDowns/manageFilters'
import MultiSelectDropdown from '../dropDowns/multifiltercheckbox'

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

const Table = ({ data: Data, columns: columnArray, title, onActions, onFilterActions, actionButtons }: any) => {
  // States
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [data, setData] = useState<any>(Data)
  const [sorting, setSorting] = useState<SortingState>([])

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
      const { name, header, type, options, size, filterType, filterOptions, buttonOptions, cellLabels } = config
      const accessor = name

      const cell = ({ row }: any) => {
        if (type === 'simple') {
          return <Typography>{row.original[name]}</Typography>
        } else if (type === 'cellLabels') {
          return (
            <div className='flex flex-col mb-1'>
              <Typography className='font-medium' color='text.primary'>
                {row.original.oa_name}
              </Typography>
              {cellLabels?.map((item: any, index: any) => (
                <span key={index} className='text-[12px] mb-1'>
                  {row.original[item]}
                </span>
              ))}
            </div>
          )
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
        } else if (type === 'dropdown_chip_and_text_with_cellLabels') {
          return (
            <div className='flex flex-col'>
              <div className='flex justify-start items-center gap-3'>
                <Typography>{row.original[name]}</Typography>
                {row.original.umpire_status && (
                  <DropdownWithChip value={row.original.umpire_status} options={options} />
                )}
              </div>
              {cellLabels?.map((item: any, index: any) => (
                <span key={index} className='text-[12px] mb-1'>
                  {row.original[item]}
                </span>
              ))}
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

      const headers = () => {
        if (filterType === 'sort') {
          return (
            <>
              {header}
              <ActionsDropDown
                name={header}
                buttonLabel='ri-arrow-drop-up-fill rotate-180 w-6 h-6 cursor-pointer'
                onItemClick={onFilterActions}
                type={filterType}
                buttons={buttonOptions}
              />
            </>
          )
        } else if (filterType === 'filter') {
          return (
            <>
              {header}
              <MultiSelectDropdown
              
                // todo pass the name to indentify the dropdown

                name={header}

                icon='ri-arrow-drop-up-fill rotate-180 w-6 h-6 cursor-pointer'
                onselect={e => console.log(e)}
                type='button-filter-dropdown'
                options={filterOptions}
              />
            </>
          )
        } else if (filterType === 'filterSort') {
          return (
            <>
              {header}
              <ActionsDropDown
                name={header}
                buttonLabel='ri-arrow-drop-up-fill rotate-180 w-6 h-6 cursor-pointer'
                onItemClick={onFilterActions}
                type={filterType}
                filterList={filterOptions}
                buttons={buttonOptions}
              />
            </>
          )
        } else if (filterType === 'range') {
          return (
            <>
              {header}
              <ActionsDropDown
                name={header}
                buttonLabel='ri-arrow-drop-up-fill rotate-180 w-6 h-6 cursor-pointer'
                onItemClick={onFilterActions}
                type={filterType}
              />
            </>
          )
        } else if (filterType === 'rangeDate') {
          return (
            <>
              {header}
              <ActionsDropDown
                name={header}
                buttonLabel='ri-arrow-drop-up-fill rotate-180 w-6 h-6 cursor-pointer'
                onItemClick={onFilterActions}
                type={filterType}
              />
            </>
          )
        }

        return <> {header}</>
      }

      return columnHelper.accessor(accessor, {
        header: headers,
        cell: cell
      })
    })
  }

  const columnArrays = generateColumns(columnArray)

  const columns = useMemo(() => columnArrays, [columnArray])

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
            <Stack spacing={2} direction='row'>
              {actionButtons &&
                actionButtons?.map((action: any) => (
                  <div key={action.label} className='relative'>
                    {action.filterCount ? (
                      <span className='absolute -top-3 right-1 z-10 border border-textPrimary bg-primary w-5 h-5 text-[10px] rounded-full flex justify-center items-center'>
                        {action.filterCount}
                      </span>
                    ) : null}

                    <Button
                      variant={action.variant}
                      color={action.color}
                      type={action.type}
                      startIcon={<i className={action.icon} />}
                      sx={{ paddingLeft: '16px', paddingRight: '16px', whiteSpace: 'nowrap' }}
                      onClick={action.onClick}
                    >
                      {action.label ? action.label : 'Action button'}
                    </Button>
                  </div>
                ))}
            </Stack>
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
                        <th key={header.id} className=''>
                          <div className='flex justify-start items-center'>
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}

                            {/* <i
                            className='ri-arrow-up-down-line w-3 h-3 ml-2'
                            onClick={header.column.getToggleSortingHandler()}
                          ></i> */}
                            {/* {{ asc: '', desc: '' }[header.column.getIsSorted() as string] ?? null} */}
                          </div>
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
    </DndContext>
  )
}

export default Table
