import React, { useState, useRef } from 'react'

// Import MUI
import {
  Checkbox,
  Button,
  FormControlLabel,
  Box,
  Typography,
  IconButton,
  TextField,
  InputAdornment
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

// Import DnD
import { useDrag, useDrop, DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

interface Column {
  header: string
  name: string
}

interface CheckboxItem {
  header: string
  active: boolean
}

interface SelectedChip {
  name: string
  position: number
}

interface CheckboxListFormProps {
  columns: Column[]
  onSubmit: (selectedItems: SelectedChip[]) => void
  onClose: () => void
}

interface DragItem {
  index: number
  header: string
  type: string
}

const CheckboxListForm: React.FC<CheckboxListFormProps> = ({ columns, onSubmit, onClose }) => {
  const [selectedChips, setSelectedChips] = useState<SelectedChip[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const [error, setError] = useState(false)

  const [totalCount, setTotalCount] = useState(
    columns.filter(item => item.header !== 'Action' && item.header !== '').length
  )

  const [selectedCount, setSelectedCount] = useState(0)

  const [checkboxes, setCheckboxes] = useState<CheckboxItem[]>(
    columns
      .filter(item => item.header !== 'Action' && item.header !== '')
      .map(item => ({
        header: item.header,
        active: false
      }))
  )

  const handleSearch = (e: any) => {
    const searchTerm = e.target.value.trim().toLowerCase()

    // If search term is empty, reset checkboxes to show all
    if (searchTerm === '') {
      setCheckboxes(
        columns
          .filter(item => item.header !== 'Action' && item.header !== '')
          .map(item => ({
            header: item.header,
            active: false
          }))
      )
      setTotalCount(columns.filter(item => item.header !== 'Action' && item.header !== '').length)
    } else {
      // Filter checkboxes based on search term
      const searchItems = columns
        .filter(item => item.header.toLowerCase().includes(searchTerm))
        .map(item => ({
          header: item.header,
          active: false
        }))

      setCheckboxes(searchItems)
      setTotalCount(searchItems.length)
    }
  }

  const handleCheckboxChange = (index: number) => {
    const newCheckboxes = [...checkboxes]

    newCheckboxes[index].active = !newCheckboxes[index].active
    setCheckboxes(newCheckboxes)

    const selectedHeaders = newCheckboxes
      .filter(item => item.active)
      .map((item, idx) => ({ name: item.header, position: idx }))

    setSelectedChips(selectedHeaders)
    setSelectedCount(selectedHeaders.length)
  }

  const handleSelectAll = () => {
    const newCheckboxes = checkboxes.map(item => ({
      ...item,
      active: !selectAll
    }))

    setCheckboxes(newCheckboxes)

    const selectedHeaders = newCheckboxes
      .filter(item => item.active)
      .map((item, idx) => ({ name: item.header, position: idx }))

    setSelectedChips(selectedHeaders)
    setSelectedCount(selectedHeaders.length)
    setSelectAll(!selectAll)
  }

  const handleResetAll = () => {
    const newCheckboxes = checkboxes.map(item => ({
      ...item,
      active: false
    }))

    setCheckboxes(newCheckboxes)
    setSelectedChips([])
    setSelectAll(false)
    setSelectedCount(0)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (selectedCount <= 3) {
      setError(true)
    } else {
      onSubmit(selectedChips)
    }
  }

  const handleChipDelete = (header: string) => {
    const newCheckboxes = checkboxes.map(item => (item.header === header ? { ...item, active: false } : item))

    setCheckboxes(newCheckboxes)
    const updatedSelectedChips = selectedChips.filter(chip => chip.name !== header)

    setSelectedChips(updatedSelectedChips)
    setSelectedCount(updatedSelectedChips.length)
  }

  const moveChip = (dragIndex: number, hoverIndex: number) => {
    const draggedChip = selectedChips[dragIndex]
    const updatedChips = [...selectedChips]

    updatedChips.splice(dragIndex, 1)
    updatedChips.splice(hoverIndex, 0, draggedChip)
    setSelectedChips(updatedChips.map((chip, idx) => ({ ...chip, position: idx })))
  }

  const Chip: React.FC<{ header: string; index: number }> = ({ header, index }) => {
    const ref = useRef<HTMLDivElement>(null)

    const [, drop] = useDrop({
      accept: 'chip',
      hover(item: DragItem) {
        if (!ref.current) return

        const dragIndex = item.index
        const hoverIndex = index

        if (dragIndex !== hoverIndex) {
          moveChip(dragIndex, hoverIndex)
          item.index = hoverIndex
        }
      }
    })

    const [{ isDragging }, drag] = useDrag({
      type: 'chip',
      item: { header, index },
      collect: monitor => ({ isDragging: monitor.isDragging() })
    })

    drag(drop(ref))

    return (
      <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1, zIndex: isDragging ? 999 : 0 }}>
        <div className='border flex justify-between text-xs p-0 items-center rounded-lg mb-2 hover:shadow-md'>
          <div>
            <IconButton>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='1.3em'
                height='1.3em'
                viewBox='0 0 256 256'
                className='cursor-grab w-5 h-4'
              >
                <path
                  fill='currentColor'
                  d='M108 60a16 16 0 1 1-16-16a16 16 0 0 1 16 16m56 16a16 16 0 1 0-16-16a16 16 0 0 0 16 16m-72 36a16 16 0 1 0 16 16a16 16 0 0 0-16-16m72 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16m-72 68a16 16 0 1 0 16 16a16 16 0 0 0-16-16m72 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16'
                />
              </svg>
            </IconButton>
            {header}
          </div>
          <i className='ri-close-circle-fill w-4 h-4 cursor-pointer m-3' onClick={() => handleChipDelete(header)}></i>
        </div>
      </div>
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <form onSubmit={handleSubmit} className='px-4'>
        <div className='flex justify-start flex-col md:flex-row w-full items-start gap-4 pb-2 max-h-[470px] md:h-[410px] overflow-y-auto md:overflow-hidden'>
          <div className='w-full md:w-3/5  p-2  md:border-r'>
            <FormControlLabel
              control={
                <Checkbox
                  size='small'
                  checked={selectAll}
                  onChange={handleSelectAll}
                  sx={{ marginTop: '4px', marginBottom: '8px' }}
                />
              }
              label={<span className=''>{selectAll ? 'Deselect all' : 'Select all'}</span>}
            />

            <TextField
              size='small'
              label='Search for columns'
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: {
                  height: '30px',
                  fontSize: '12px',
                  padding: '5px 10px',
                  '.MuiInputBase-input': {
                    padding: '0 5px'
                  }
                }
              }}
              sx={{
                '.MuiInputLabel-root': {
                  fontSize: '12px'
                },
                '.MuiFormLabel-root': {
                  top: '-2px'
                },
                '.MuiInputBase-root': {
                  height: '30px',
                  fontSize: '12px'
                }
              }}
            ></TextField>

            <div className='flex justify-center items-start gap-1.5 flex-col lg:flex-row py-2 lg:justify-start lg:items-center'>
              <Typography variant='h6' >
                Available Columns
              </Typography>
              <span
                className={`bg-white/10 rounded font-semibold md:px-2 ${
                  selectedCount < 3 ? error && 'text-red-500' : 'text-primary'
                }`}
              >
                {`${selectedCount} out of ${totalCount} Selected`}
              </span>
              {error && selectedCount < 3 && (
                <span className='text-red-500 text-xs'>Select at least three columns.</span>
              )}
            </div>
            {checkboxes.map((item, index) => (
              <span key={index} className={`rounded border px-2 py-1 my-2 mr-1 ${item.active && 'bg-white/10'}`}>
                <FormControlLabel
                  control={
                    <Checkbox
                      size='small'
                      checked={item.active}
                      onChange={() => handleCheckboxChange(index)}
                      sx={{ marginTop: '4px', marginBottom: '4px' }}
                    />
                  }
                  label={item.header}
                />
              </span>
            ))}
          </div>

          <div className='w-full md:w-2/5 max-h-[470px] md:max-w-[410px] md:overflow-y-auto md:max-h-96'>
            <Typography variant='h6'>Reorder columns</Typography>
            <Typography variant='body2'>Click and drag to reorder the columns</Typography>
            <Box sx={{ padding: '4px', paddingBottom: '12px', paddingTop: '12px', minHeight: '62px' }}>
              {selectedChips.map((chip, index) => (
                <Chip key={chip.name} header={chip.name} index={index} />
              ))}
            </Box>
          </div>
        </div>
        <div className='flex justify-between gap-2 pb-4 flex-col sm:flex-row'>
          <Button
            variant='outlined'
            color='inherit'
            type='button'
            onClick={handleResetAll}
          >
            Reset
          </Button>
          <div className='flex justify-start gap-2 flex-col sm:flex-row'>
            <Button variant='outlined' color='inherit' type='button' onClick={onClose} >
              Cancel
            </Button>
            <Button variant='contained' type='submit' >
              Apply
            </Button>
          </div>
        </div>
      </form>
    </DndProvider>
  )
}

export default CheckboxListForm
