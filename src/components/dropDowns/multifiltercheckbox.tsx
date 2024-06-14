import React, { useState } from 'react';

import { Checkbox, FormControl, MenuItem, Select } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';

interface Options {
  label: string;
  active: boolean;
}

interface MultiSelectDropdownProps {
  options: Options[];
  onselect: (selected: string[]) => void;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({ options, onselect }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];

    setSelectedItems(value);
    onselect(value);
  };

  return (
    <FormControl>
      <Select
        multiple
        value={selectedItems}
        onChange={handleChange}
        size="small"
        style={{ minWidth: '250px' }}
        displayEmpty
        renderValue={(selected) => {
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
        {options.map((item) => (
          <MenuItem
            key={item.label}
            value={item.label}
            className='text-current'
            style={{ backgroundColor: 'transparent', height: '45px', minWidth:'200px' }}
          >
            <Checkbox checked={selectedItems.includes(item.label)} />
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelectDropdown;
