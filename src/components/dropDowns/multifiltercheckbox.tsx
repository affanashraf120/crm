'use client'

import React, { useState } from 'react'

import { Checkbox, FormControl, IconButton, InputAdornment, Menu, MenuItem, Select, TextField } from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

interface Options {
  label: string
  active: boolean
}

interface MultiSelectDropdownProps {
  options: Options[]
  type?: string
  onselect: (selected: string[]) => void
  icon?: string
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({ options, onselect, type, icon }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const open = Boolean(anchorEl)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value)

    const filteredOptions = options?.filter(
      option => option?.label && option.label.toLowerCase().includes(event.target.value.toLowerCase())
    )

    console.log('🚀 ~ handleSearch ~ filteredOptions:', filteredOptions)
  }

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[]

    setSelectedItems(value)
    onselect(value)
  }

  const handleItemClick = (label: string) => {
    const newSelectedItems = selectedItems.includes(label)
      ? selectedItems.filter(item => item !== label)
      : [...selectedItems, label]

    setSelectedItems(newSelectedItems)
    onselect(newSelectedItems)
  }

  if (type === 'button-filter-dropdown') {
    return (
      <>
        <IconButton
          aria-controls={open ? 'generic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleMenuOpen}
        >
          <i className={icon}></i>
        </IconButton>


        <Menu id='generic-menu' anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
          <MenuItem
            sx={{
              '&:hover': {
                backgroundColor: 'transparent'
              }
            }}
          >
            <TextField
              size='small'
              value={searchTerm}
              onInput={handleSearch}
              onKeyDown={e => {
                e.stopPropagation()
              }}
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
            />
          </MenuItem>

          {options
            .filter(item => item.label && item.label.toLowerCase().includes(searchTerm.toLowerCase()))

            .map(item => (
              <MenuItem
                key={item.label}
                value={item.label}
                onClick={() => handleItemClick(item.label)}
                style={{ backgroundColor: 'transparent', height: '45px', minWidth: '200px' }}
              >
                <Checkbox checked={selectedItems.includes(item.label)} />
                {item.label}
              </MenuItem>
            ))}
        </Menu>
      </>
    )
  } else {
    return (
      <FormControl>
        <Select
          multiple
          value={selectedItems}
          onChange={handleChange}
          size='small'
          style={{ minWidth: '250px' }}
          displayEmpty
          renderValue={selected => {
            if (selected.length === 0) {
              return <span>Filter By Folder</span>
            }

            return (
              <div className='flex flex-wrap'>
                {selected.length === 1 ? selected[0] : `${selected[0]} + ${selected.length - 1}`}
              </div>
            )
          }}
        >
          {options.map(item => (
            <MenuItem
              key={item.label}
              value={item.label}
              className='text-current'
              style={{ backgroundColor: 'transparent', height: '45px', minWidth: '200px' }}
            >
              <Checkbox checked={selectedItems.includes(item.label)} />
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }
}

export default MultiSelectDropdown
