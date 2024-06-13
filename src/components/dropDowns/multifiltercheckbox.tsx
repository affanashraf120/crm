import React, { useState } from 'react'

import { Checkbox, FormControl, MenuItem, Select } from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'

interface Options {
  label: string
  active: boolean
}

interface MultiSelectDropdownProps {
  options: Options[]
  onselect: React.Dispatch<React.SetStateAction<string[]>>
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({ options, onselect }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedItems(event.target.value as string[])
    onselect(event.target.value as string[])  
  }

  return (
    <FormControl>
      <Select
        multiple
        value={selectedItems}
        onChange={handleChange}
        size='small'
        style={{ minWidth: '250px' }}
        renderValue={selected => (
          <div className='flex flex-wrap'>
            {selected.length === 0
              ? 'Filter by Folders'
              : selected.length === 1
                ? selected[0]
                : `${selected[0]} + ${selected.length - 1}`}
          </div>
        )}
      >
        {options.map(item => (
          <MenuItem key={item.label} value={item.label}>
            <Checkbox checked={selectedItems.includes(item.label)} />
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default MultiSelectDropdown
