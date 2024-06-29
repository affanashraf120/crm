import * as React from 'react'
import { useState } from 'react'

import { Button, IconButton } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

interface Option {
  label: string
  icon?: string
  id?: any
}

interface Props {
  buttonLabel?: string
  menuOptions: Option[]
  onMenuItemClick: (menuItem: Option | null) => void
  label?: string
}

function DropDownButton({ buttonLabel, menuOptions, onMenuItemClick, label }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (menuItem: Option | null) => {
    setAnchorEl(null)
    onMenuItemClick(menuItem)
  }

  return (
    <>
      {label ? (
        <Button
          variant='contained'
          size='small'
          sx={{ height: '30px' }}
          aria-controls={open ? 'generic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <>
            {label}
            <i className='ri-arrow-down-s-line'></i>
          </>
        </Button>
      ) : (
        <IconButton
          aria-controls={open ? 'generic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <i className={buttonLabel}></i>
        </IconButton>
      )}

      <Menu
        id='generic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        {menuOptions &&
          menuOptions.map((option, index) => (
            <MenuItem key={index} onClick={() => handleClose(option)} sx={{ minWidth: '200px' }}>
              {option.icon && (
                <>
                  <i className={`${option.icon} mr-2`}></i>
                </>
              )}
              <Typography variant='inherit'>{option.label}</Typography>
            </MenuItem>
          ))}
      </Menu>
    </>
  )
}

export default DropDownButton
