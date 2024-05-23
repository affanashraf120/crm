import React from 'react';

import { TextField } from '@mui/material';

const FileInput = ({  error, helperText, register }: any) => {
  const handleFileChange = (event:any) => {
    const file = event.target.files[0];

    console.log('Selected file:', file);
  };

  return (
      <TextField
        variant="outlined"        
        size='small'
        fullWidth
        id="file"
        label="Upload File"
        type="file"
        {...register}
        error={error}
        helperText={helperText}
        InputLabelProps={{ shrink: true }}
        onChange={handleFileChange}
      />
      
  );
};

export default FileInput;
