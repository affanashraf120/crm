'use client'

import React, { useState } from 'react'

import { Button, TextField } from '@mui/material'

const CreateFolder = ({ onClose }: any) => {
  const [createFolder, setCreateFolder] = useState('')

  console.log('🚀 ~ CreateFolder ~ createFolder:', createFolder)

  return (
    <div>
      <TextField
        placeholder='Folder Name...'
        variant='standard'
        fullWidth
        onChange={(e: any) => setCreateFolder(e.target.value)}
        value={createFolder}
      />
      <div className='py-4 flex justify-between items-center'>
        <Button variant='outlined' color='inherit' onClick={onClose}>
          Cancel
        </Button>
        <div className=' flex justify-center items-center gap-4'>
          <Button variant='outlined' color='inherit' onClick={() => setCreateFolder('')}>
            Clear
          </Button>
          <Button variant='contained' onClick={onClose}>
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreateFolder
