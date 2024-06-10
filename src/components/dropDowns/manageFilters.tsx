import * as React from 'react'
import { useState } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import Typography from '@mui/material/Typography'

import DateRangePicker from '../calender'

interface Option {
  label?: string
  icon?: string
  id?: any
  startRange?: string
  endRange?: string
  searchItem: any
  name: string
}

interface Props {
  buttonLabel: string
  buttons?: Option[]
  onItemClick: (menuItem: Option | null) => void
  type?: string
  filterList?: Option[]
  name: string
}

function FiltersDropDown({ buttonLabel, buttons, onItemClick, type, filterList, name }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [startRange, setStartRange] = useState('')
  const [endRange, setEndRange] = useState('')
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClicked = (menuItem: Option | null) => {
    setAnchorEl(null)
    onItemClick(menuItem)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleClear = () => {
    setStartRange('')
    setEndRange('')
  }

  const filteredOptions = filterList?.filter(
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
          onClose={() => handleClicked(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          {buttons &&
            buttons.map((option, index) => (
              <MenuItem key={index} onClick={() => handleClicked({ searchItem: option?.label, name: name })}>
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
          onClose={() => handleClicked(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
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
            {filteredOptions?.length === 0 && (
              <span className='text-xs items-center w-full flex justify-center'>No options found :(</span>
            )}

            {filteredOptions?.map((option, index) => (
              <MenuItem key={index} onClick={() => handleClicked({ searchItem: option?.label, name: name })}>
                <Typography variant='inherit'>{option.label}</Typography>
              </MenuItem>
            ))}
          </div>
        </Menu>
      </>
    )
  } else if (type === 'filterSort') {
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
          onClose={() => handleClicked(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
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
            {filteredOptions?.length === 0 && (
              <span className='text-xs items-center w-full flex justify-center'>No options found :(</span>
            )}

            {filteredOptions?.map((option, index) => (
              <MenuItem key={index} onClick={() => handleClicked({ searchItem: option?.label, name: name })}>
                <Typography variant='inherit'>{option.label}</Typography>
              </MenuItem>
            ))}
          </div>

          {buttons &&
            buttons.map((option, index) => (
              <MenuItem key={index} onClick={() => handleClicked({ searchItem: option?.label, name: name })}>
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
          onClose={() => handleClicked(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
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
          <div className='flex flex-col gap-2 px-4'>
            <TextField
              size='small'
              label='Start Range...'
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
              label='End Range...'
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
          <div className='flex justify-between items-center px-4'>
            <span onClick={handleClear} className='flex justify-end items-end text-secondary py-2 cursor-pointer'>
              Clear
            </span>
            <span
              onClick={() => handleClicked({ searchItem: { startRange: startRange, endRange: endRange }, name: name })}
              className='flex justify-end items-end  text-primary py-2 cursor-pointer'
            >
              Save
            </span>
          </div>
        </Menu>
      </>
    )
  } else if (type === 'rangeDate') {
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
          onClose={() => handleClicked(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <MenuItem
            sx={{
              '&:hover': {
                backgroundColor: 'transparent'
              }
            }}
          >
            <Typography variant='inherit'>Set Date Range</Typography>
          </MenuItem>
          <div className='flex flex-col gap-2 px-4'>
            <DateRangePicker onSave={handleClicked} name={name} />
          </div>
        </Menu>
      </>
    )
  }
}

export default FiltersDropDown
