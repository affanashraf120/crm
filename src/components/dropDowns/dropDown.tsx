import React, { useState } from 'react'

import type { SelectChangeEvent } from '@mui/material'
import { Select, MenuItem, Input, Button } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

interface Props {
  value: string | null
  options: string[]
  onChange?: (value: string) => void
  variant?: string
}

const Dropdown: React.FC<Props> = ({ value, options, onChange, variant  }) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(value)


  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value)
    onChange && onChange(event.target.value)
  }

  return variant ? (
    <Select value={selectedValue || ''} onChange={handleChange} displayEmpty size='small' label='Select'>
      {options &&
        options.map(option => (
          <MenuItem key={option.toLocaleLowerCase().replaceAll(' ', '-')} value={option}>
            <div className='flex justify-between items-center min-w-[160px] gap-6'>{option}</div>
          </MenuItem>
        ))}
    </Select>
  ) : (
    <Select
      value={selectedValue || ''}
      onChange={handleChange}
      variant='outlined'
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
      sx={{ minWidth: 130 }}
      renderValue={() => (
        <Button color='inherit' className='flex justify-start items-center gap-1'>
          {selectedValue}
          {options && <KeyboardArrowDownIcon />}
        </Button>
      )}
    >
      {options &&
        options.map(option => (
          <MenuItem key={option.toLocaleLowerCase().replaceAll(' ', '-')} value={option}>
            <div className='flex justify-between items-center w-full md:min-w-[160px] gap-6'>
              
              {option}
              {selectedValue === option && <i className='ri-check-line w-4 h-4 me-2'></i>}
            </div>
          </MenuItem>
        ))}
    </Select>
  )
}

export default Dropdown
