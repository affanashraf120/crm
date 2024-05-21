import React, { useState } from 'react'

import type { SelectChangeEvent } from '@mui/material'
import { Select, MenuItem, Input, Button } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

interface Props {
  value: string | null
  options: string[]
}

const Dropdown: React.FC<Props> = ({ value, options }) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(value)

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value)
  }

  return (
    <div>
      <Select
        value={selectedValue || ''}
        onChange={handleChange}
        variant='outlined'
        IconComponent={'span'}
        input={<Input disableUnderline />}
        MenuProps={{
          anchorOrigin: {
            vertical: 'center',
            horizontal: 'left'
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left'
          },
          style: {
            left: '100px'
          }
        }}
        sx={{ minWidth: 130 }}
        renderValue={() => (
          <Button color='inherit' className='flex justify-start items-center gap-1'>
            {selectedValue}
            <KeyboardArrowDownIcon />
          </Button>
        )}
      >
        {options.map(option => (
          <MenuItem key={option.toLocaleLowerCase().replaceAll(' ', '-')} value={option}>
            <div className='flex justify-between items-center w-full md:min-w-[160px] gap-6'>
              {option}
              {selectedValue === option && <i className='ri-check-line w-4 h-4 me-2'></i>}
            </div>
          </MenuItem>
        ))}
      </Select>
    </div>
  )
}

export default Dropdown
