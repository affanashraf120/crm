import React, { useState } from 'react'

import type { SelectChangeEvent } from '@mui/material'
import { Select, MenuItem, Chip, Input, Tooltip } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

// Define the allowed colors explicitly
type ChipColor = 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'

interface Option {
  id: number
  value: string
  color: ChipColor
}

interface Props {
  value: Option
  options: Option[]
}

const DropdownWithChip: React.FC<Props> = ({ value, options }) => {
  const [selectedValue, setSelectedValue] = useState<Option>(value)

  const handleChange = (event: SelectChangeEvent<string>) => {
    const temp = options.find(e => e.value === event.target.value)

    if (temp) {
      setSelectedValue(temp)
    }
  }

  const renderChip = (option: Option) => (
    <Chip
      key={option.id}
      label={option.value}
      variant='tonal'
      color={option.color}
      size='small'
      onDelete={() => {}}
      deleteIcon={<KeyboardArrowDownIcon />}
      style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100px' }}
    />
  )

  return (
    <div>
      <Select
        value={selectedValue.value}
        onChange={handleChange}
        variant='outlined'
        native={false}
        IconComponent={'span'}
        input={<Input disableUnderline />}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left'
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left'
          }
        }}
        renderValue={() => (
          <div>
            {selectedValue.value.length > 12 ? (
              <Tooltip title={selectedValue.value}>{renderChip(selectedValue)}</Tooltip>
            ) : (
              <Chip
                key={selectedValue.id}
                label={selectedValue.value}
                variant='tonal'
                color={selectedValue.color}
                size='small'
                onDelete={() => {}}
                deleteIcon={<KeyboardArrowDownIcon />}
              />
            )}
          </div>
        )}
      >
        {options.map(option => (
          <MenuItem key={option.id} value={option.value}>
            <div className='flex justify-between items-center w-full md:min-w-[160px] gap-6'>
              <Chip key={option.id} label={option.value} variant='tonal' color={option.color} size='small' />
              {selectedValue.value === option.value && <i className='ri-check-line w-4 h-4 me-2'></i>}
            </div>
          </MenuItem>
        ))}
      </Select>
    </div>
  )
}

export default DropdownWithChip

// Example usage
// const options: Option[] = [
//   { id: 1, value: 'Closed', color: 'info' },
//   { id: 2, value: 'Open', color: 'success' },
//   { id: 3, value: 'Scheduling Inspection', color: 'default' },
//   { id: 4, value: 'Umpire', color: 'primary' }
// ]
