'use client'

import React, { useState } from 'react'

import Radio from '@mui/material/Radio'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  RadioGroup,
  Select,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

interface Options {
  label: string
  active: boolean
}

interface SelectedItem {
  label: string
  filters: string[]
}

interface MultiSelectDropdownProps {
  options: Options[]
  type?: string
  onselect: (selected: SelectedItem) => void
  icon?: string
  placeHolder?: string
  title?: string
  toolTip?: string
  name: string
  isScrollable?: boolean
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  onselect,
  type,
  icon,
  placeHolder,
  title,
  toolTip,
  name,
  isScrollable = true
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState<string>('')

  const open = Boolean(anchorEl)

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value)
  }

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[]

    setSelectedItems(value)
    onselect({ label: name, filters: value })
  }

  const handleItemClick = (label: string) => {
    const newSelectedItems = selectedItems.includes(label)
      ? selectedItems.filter(item => item !== label)
      : [...selectedItems, label]

    console.log('🚀 ~ handleItemClick ~ newSelectedItems:', newSelectedItems)

    setSelectedItems(newSelectedItems)
    onselect({ label: name, filters: newSelectedItems })
  }

  const handleClickedSort = (item: string) => {
    console.log('🚀 ~ handleClickedSort ~ item:', item)
    setValue(item)
    onselect({ label: name, filters: [item] })
  }

  if (type === 'button-filter-dropdown') {
    return (
      <div className='max-h-[300px]'>
        <Tooltip title={toolTip}>
          <IconButton
            aria-controls={open ? 'generic-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            onClick={handleMenuOpen}
          >
            <i className={icon}></i>
          </IconButton>
        </Tooltip>

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

          <div className={`flex flex-col gap-1  ${isScrollable ? 'overflow-y-auto max-h-[200px]' : ''}`}>
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
          </div>
        </Menu>
      </div>
    )
  } else if (type === 'accordion-checkbox') {
    return (
      <div className='flex flex-col w-full'>
        <div className='flex items-center justify-start cursor-pointer' onClick={handleOpen}>
          <span className='mt-1'>
            {isOpen ? (
              <i className='ri-arrow-drop-right-line rotate-90 transition-all duration-300 ease-in-out'></i>
            ) : (
              <i className='ri-arrow-drop-right-line transition-all duration-300 ease-in-out'></i>
            )}
          </span>
          <Typography variant='body1'>{title}</Typography>
        </div>
        <div className={`overflow-hidden transition-all duration-700 ease-in-out w-full ${isOpen ? 'h-auto' : 'h-0'}`}>
          <div className={` ${isScrollable ? 'overflow-y-auto max-h-[200px]' : ''} w-full`}>
            {options.map((item, index) => (
              <div
                key={index}
                className='flex items-center pl-4 cursor-pointer'
                onClick={() => handleItemClick(item.label)}
              >
                <Checkbox checked={selectedItems.includes(item.label)} />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  } else if (type === 'accordion-sort') {
    return (
      <div className='flex flex-col'>
        <div className='flex items-center justify-start cursor-pointer' onClick={handleOpen}>
          <span className='mt-1'>
            {isOpen ? (
              <i className='ri-arrow-drop-right-line rotate-90 transition-all duration-300 ease-in-out'></i>
            ) : (
              <i className='ri-arrow-drop-right-line transition-all duration-300 ease-in-out'></i>
            )}
          </span>
          <Typography variant='body1'>{title}</Typography>
        </div>
        <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isOpen ? 'h-auto' : 'h-0'}`}>
          <div>
            <RadioGroup
              aria-labelledby='demo-controlled-radio-buttons-group'
              name='controlled-radio-buttons-group'
              value={value}
              onChange={event => handleClickedSort(event.target.value)}
            >
              <div className={` ${isScrollable ? 'overflow-y-auto max-h-[200px]' : ''} w-full`}>
                {options.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item.label}
                    control={<Radio />}
                    label={item.label}
                    className='pl-5'
                  />
                ))}
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <FormControl>
        <Select
          multiple
          value={selectedItems}
          onChange={handleChange}
          size='small'
          style={{ minWidth: '250px', maxHeight: '300px' }}
          displayEmpty
          renderValue={selected => {
            if (selected.length === 0) {
              return <span>{placeHolder}</span>
            }

            return (
              <div className='flex flex-wrap'>
                {selected.length === 1 ? selected[0] : `${selected[0]} + ${selected.length - 1}`}
              </div>
            )
          }}
        >
          <div className={` ${isScrollable ? 'overflow-y-auto max-h-[200px] ' : ''} w-full`}>
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
          </div>
        </Select>
      </FormControl>
    )
  }
}

export default MultiSelectDropdown
