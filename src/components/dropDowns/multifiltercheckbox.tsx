import React, { useState } from 'react';

import { Checkbox, FormControl, IconButton, InputAdornment, Menu, MenuItem, Select, TextField } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface Options {
  label: string;
  active: boolean;
}

interface MultiSelectDropdownProps {
  options: Options[];
  type?: string;
  onselect: (selected: string[]) => void;
  icon?: string;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({ options, onselect, type, icon }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("🚀 ~ handleSearchChange ~ event:", event.target.value)

    setSearchTerm(event.target.value);
  };

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];

    setSelectedItems(value);
    onselect(value);
  };

  const handleItemClick = (label: string) => {
    const newSelectedItems = selectedItems.includes(label)
      ? selectedItems.filter(item => item !== label)
      : [...selectedItems, label];

    setSelectedItems(newSelectedItems);
    onselect(newSelectedItems);
  };

  const filteredOptions = options?.filter(
    option => option?.label && option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (type === 'button-filter-dropdown') {
    return (
      <FormControl>
        <IconButton onClick={handleMenuOpen}>
          <i className={icon}></i>
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} className='p-2'>
          <MenuItem   sx={{
              '&:hover': {
                backgroundColor: 'transparent'
              }
            }}>
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
          {filteredOptions.map(item => (
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
      </FormControl>
    );
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
              return <span>Filter By Folder</span>;
            }

            return (
              <div className='flex flex-wrap'>
                {selected.length === 1 ? selected[0] : `${selected[0]} + ${selected.length - 1}`}
              </div>
            );
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
    );
  }
};

export default MultiSelectDropdown;
