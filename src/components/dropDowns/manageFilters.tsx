import * as React from 'react'
import { useState } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import Typography from '@mui/material/Typography'



interface Option {
  label?: string
  icon?: string
  id?: any
  startRange?: string
  endRange?: string
}

interface Props {
  buttonLabel: string
  menuOptions: Option[]
  onMenuItemClick: (menuItem: Option | null) => void
  type?: string
  options: Option[]
}

function FiltersDropDown({ buttonLabel, menuOptions, onMenuItemClick, type, options }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [startRange, setStartRange] = useState('')
  const [endRange, setEndRange] = useState('')
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (menuItem: Option | null) => {
    setAnchorEl(null)
    onMenuItemClick(menuItem)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredOptions = options?.filter(
    option => option?.label && option.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (type === 'sort') {
    return (
      <>
        <IconButton
          aria-controls={open ? 'generic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <i className={buttonLabel}></i>
        </IconButton>
        <Menu
          id='generic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={() => handleClose(null)}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
        >
          {menuOptions &&
            menuOptions.map((option, index) => (
              <MenuItem key={index} onClick={() => handleClose(option)}>
                {option.icon && (
                  <ListItemIcon>
                    <i className={option.icon}></i>
                  </ListItemIcon>
                )}
                <Typography variant='inherit'>{option.label}</Typography>
              </MenuItem>
            ))}
        </Menu>
      </>
    )
  } else if (type === 'filter') {
    return (
      <>
        <IconButton
          aria-controls={open ? 'generic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <i className={buttonLabel}></i>
        </IconButton>
        <Menu
          id='generic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={() => handleClose(null)}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
        >
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
              onChange={handleSearchChange}
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

          <div className='max-h-40 overflow-y-auto'>
            {filteredOptions.length === 0 && (
              <span className='text-xs items-center w-full flex justify-center'>No options found :(</span>
            )}

            {filteredOptions.map((option, index) => (
              <MenuItem key={index} onClick={() => handleClose(option)}>
                <Typography variant='inherit'>{option.label}</Typography>
              </MenuItem>
            ))}
          </div>
        </Menu>
      </>
    )
  } else if (type === 'range') {
    return (
      <>
        <IconButton
          aria-controls={open ? 'generic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <i className={buttonLabel}></i>
        </IconButton>
        <Menu
          id='range-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={() => handleClose(null)}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
        >
          <MenuItem
            sx={{
              '&:hover': {
                backgroundColor: 'transparent'
              }
            }}
          >
            <Typography variant='inherit'>Set Range</Typography>
          </MenuItem>
          <div className='flex justify-center items-center gap-2 px-4'>
            <TextField
              size='small'
              label='Start Range'
              value={startRange}
              onChange={e => setStartRange(e.target.value)}
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

            <TextField
              size='small'
              label='End Range'
              value={endRange}
              onChange={e => setEndRange(e.target.value)}
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
          </div>
          <span
            onClick={() => handleClose({ startRange: startRange, endRange: endRange })}
            className='flex justify-end items-end pe-4 text-primary py-2 cursor-pointer'
          >
            Save
          </span>
        </Menu>
      </>
    )
  }
}

export default FiltersDropDown
