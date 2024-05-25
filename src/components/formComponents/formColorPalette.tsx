import React, { useEffect, useRef, useState } from 'react'

import { Paper, Button, FormLabel, InputAdornment, OutlinedInput, Tooltip } from '@mui/material'

import { useSettings } from '@/@core/hooks/useSettings'
import ConfirmationDialog from '../dialogs/confirmation-dialog'

interface Color {
  name: string
  colorCode: string
}

interface ColorPaletteProps {
  onClose: () => void
  setColorSelect: (color: { id: number | null; value: string; color: string }) => void
  selectedRow: { value: string; color: string; id: number | null }
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ onClose, setColorSelect, selectedRow }) => {
  const { id, value, color: selclr } = selectedRow
  const [open, setOpen] = useState(false)
  const { settings } = useSettings()
  const [editableValue, setEditableValue] = useState(value)
  const [selectedColor, setSelectedColor] = useState(selclr)
  const inputRef = useRef<HTMLInputElement>(null)


  const handleInputChange = (selectedColor: Color) => {
    const inputValue = inputRef.current?.value || value
    const newColor = selectedColor.name || selclr

    setEditableValue(inputValue)
    setColorSelect({ id, color: newColor, value: inputValue })
    setSelectedColor(newColor)

    console.log(selectedColor.colorCode)
  }

  const handleClickOutside = (event: MouseEvent) => {
    const modal = document.getElementById('colorPaletteModal')

    if (modal && !modal.contains(event.target as Node)) {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  return (
    <>
      <Paper
        id='colorPaletteModal'
        sx={{ position: 'absolute', padding: '10px', zIndex: 1300, width: '250px', top: '0px', right: '-10px' }}
      >
        <div className='px-2'>
          <OutlinedInput
            size='small'
            value={editableValue || ''}
            inputRef={inputRef}
            onChange={() => setEditableValue(inputRef.current?.value || '')}
            endAdornment={
              <InputAdornment position='end'>
                <Tooltip title='Add Description' placement='top-end'>
                  <i className='ri-information-2-fill w-4 h-4 cursor-pointer'></i>
                </Tooltip>
              </InputAdornment>
            }
          />
        </div>
        <Button
          variant='text'
          fullWidth
          size='small'
          color='secondary'
          sx={{
            marginTop: '6px',
            gap: '4px',
            justifyContent: 'start'
          }}
          onClick={() => setOpen(true)}
        >
          <i className='ri-delete-bin-6-line w-4 h-4' />
          Delete
        </Button>

        <div className='flex flex-1 flex-col py-2 mt-2 w-full border-t-2 '>
          <FormLabel sx={{ marginBottom: '4px' }}>Colors</FormLabel>
          {colors.map((color, index) => (
            <div
              className={`flex justify-between items-center gap-2 rounded duration-300 ease-in-out transition-all ${
                settings.mode === 'dark' ? 'hover:bg-[#37334C]' : 'hover:bg-[#E5E5EB]'
              }
            `}
              key={index}
            >
              <div
                className='flex justify-center items-center gap-2 py-0.5 px-2'
                onClick={() => handleInputChange(color)}
                style={{ cursor: 'pointer' }}
              >
                <div
                  style={{
                    backgroundColor: color.colorCode,
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    marginLeft: '2px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    borderRadius: '5px',
                    textTransform: 'uppercase',
                    fontWeight: 'bold'
                  }}
                ></div>
                {color.name}
              </div>
              {selectedColor === color.name && <i className='ri-check-line w-4 h-4 me-2'></i>}
            </div>
          ))}
        </div>
      </Paper>
      <ConfirmationDialog open={open} setOpen={setOpen} type='delete-account' title='Are you sure you want to delete this item?'/>


    </>
  )
}

export default ColorPalette

const colors: Color[] = [
  { name: 'info', colorCode: '#ADD8E6' },
  { name: 'success', colorCode: '#90EE90' },
  { name: 'default', colorCode: '#ADD832' },
  { name: 'primary', colorCode: '#FFFF00' },
  { name: 'secondary', colorCode: '#00FFFF' },
  { name: 'error', colorCode: '#FF00FF' },
  { name: 'warning', colorCode: '#FFFFFF' }
]
