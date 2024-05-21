import * as React from 'react'
import { useState } from 'react'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import { IconButton } from '@mui/material'

interface Option {
  label: string
  icon?: string
}

interface Props {
  buttonLabel: string
  menuOptions: Option[]
  onMenuItemClick: (menuItem: Option | null) => void
}

function DropDownButton({ buttonLabel, menuOptions, onMenuItemClick }: Props) {
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
    <div>
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
    </div>
  )
}

export default DropDownButton
