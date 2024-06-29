import React, { useState, useRef, useEffect } from 'react'

import { Button, Chip, IconButton } from '@mui/material'

import { useSettings } from '@/@core/hooks/useSettings'
import ColorPalette from './formColorPalette'

interface Option {
  id: number
  color: any
  value: string
}

interface CustomAutocompleteProps {
  options: Option[]
  register: any
  name: string
  setValue: any
}

export const StatusDropdown: React.FC<CustomAutocompleteProps> = ({ options, register, name, setValue }) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options)
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const { settings } = useSettings()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [selectedChip, setSelectedChip] = useState<Option | null>(null)
  const [showColorPalette, setShowColorPalette] = useState(false)
  const [colorSelect, setColorSelect] = useState<Option | null>(null)
  const [selectedRow, setSelectedRow] = useState<Option | null>(null)
  const [disable, setDisable] = useState(false)

  // Generate the new array
  function updateObjectInArray(array: Option[], updatedObject: Option) {
    const index = array.findIndex(option => option.id === updatedObject.id)

    if (index !== -1) {
      const newArray = [...array]

      newArray[index] = updatedObject

      return newArray
    } else {
      console.error(`Object with id ${updatedObject.id} not found.`)

      return array
    }
  }

  // Update the Array and send to the db
  useEffect(() => {
    if (colorSelect) {
      const updatedOptions = updateObjectInArray(options, colorSelect)

      setFilteredOptions(updatedOptions)

      // Todo save to db
    }
  }, [colorSelect])

  // Handle outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && !showColorPalette) {
        setShowOptions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showColorPalette])

  // Handle Search items
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    const filteredOptions = options.filter(item => item.value.toLowerCase().includes(input.toLowerCase()))

    setInputValue(input)
    setFilteredOptions(filteredOptions)
    setShowOptions(true)
  }

  // Clicked item or chip
  const handleItemClick = (item: Option) => {
    if (item) {
      if (!showColorPalette) {
        setInputValue('')
        setSelectedChip(item)
        setShowOptions(false)
        setDisable(true)
        setValue(name, JSON.stringify(item))
      }

      setShowOptions(false)
      setShowColorPalette(false)
    }
  }

  // Delete chip from the input
  const handleDeleteChip = () => {
    setSelectedChip(null)
    setDisable(false)
    setValue(name, null)
  }

  const handleInputFocus = () => {
    setShowOptions(true)
  }

  // Handle Color Palette close
  const handleColorPaletteClose = () => {
    setShowColorPalette(false)
  }

  const handleSelectedRowValues = (item: Option) => {
    if (item) {
      setSelectedRow(item)
      setShowColorPalette(true)
    }
  }

  return (
    <div ref={dropdownRef} className='relative w-full'>
      <div className='relative flex gap-1'>
        <div className='absolute top-4 left-4'>
          {selectedChip && selectedChip.value && (
            <Chip
              label={selectedChip.value}
              onDelete={handleDeleteChip}
              size='small'
              variant='tonal'
              color={selectedChip.color}
            />
          )}
        </div>
        <input
          type='text'
          value={inputValue}
          {...register(name)}
          placeholder={disable ? '' : 'Default'}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          disabled={disable}
          className='w-full px-[14px] py-[16px] text-sm text-[#B1ACC7] bg-transparent border focus:border-2 border-[#595572] rounded-md focus:outline-none focus:border-[#1b5e20] placeholder:text-[#9C97B3] placeholder:text-sm'
        />
        <div className='absolute right-4 top-4 flex justify-end items-center'>
          <IconButton onClick={() => setShowOptions(!showOptions)} sx={{ padding: '2px' }}>
            <i
              className={`ri-arrow-down-s-line w-6 h-6  transition-all duration-300 ease-in-out ${
                showOptions && 'rotate-180 '
              } ${settings.mode === 'dark' ? 'hover:text-[#d8d4eb]' : 'hover:text-[#000] '}`}
            ></i>
          </IconButton>
        </div>
      </div>
      {showOptions && (
        <ul
          className={`absolute w-full mt-1 rounded-lg shadow-lg z-20 ${
            settings.mode === 'dark' ? 'bg-[#312D4B]' : 'bg-[#E5E5EB]'
          }`}
        >
          <p className='px-5 py-1 text-xs'>Select an option or create one</p>
          {filteredOptions.map(item => (
            <div
              key={item.value.toLocaleLowerCase().replaceAll(' ', '-')}
              className={`flex justify-between items-center w-full px-4 py-1
              ${selectedChip?.value === item.value && 'bg-[#2e7d3229]'}
              ${
                settings.mode === 'dark'
                  ? selectedChip?.value === item.value
                    ? 'hover:bg-[#2e7d3229]'
                    : 'hover:bg-[#37334C]'
                  : 'hover:bg-[#E5E5EB] bg-[#fff]'
              }`}
            >
              <div
                className='flex justify-center items-center gap-1 cursor-pointer'
                onClick={() => handleItemClick(item)}
              >
                <svg xmlns='http://www.w3.org/2000/svg' width='1.3em' height='1.3em' viewBox='0 0 256 256'>
                  <path
                    fill='currentColor'
                    d='M108 60a16 16 0 1 1-16-16a16 16 0 0 1 16 16m56 16a16 16 0 1 0-16-16a16 16 0 0 0 16 16m-72 36a16 16 0 1 0 16 16a16 16 0 0 0-16-16m72 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16m-72 68a16 16 0 1 0 16 16a16 16 0 0 0-16-16m72 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16'
                  />
                </svg>
                <Chip label={item.value} color={item.color} size='small' variant='tonal' />
              </div>
              <IconButton onClick={() => handleSelectedRowValues(item)}>
                <i className='ri-more-line w-5 h-5'></i>
              </IconButton>
            </div>
          ))}
          {filteredOptions.length === 0 && (
            <Button
              color='primary'
              fullWidth
              sx={{ justifyContent: 'flex-start', pl: 2 }}
              onMouseDown={() => console.log('clicked')}
            >
              + Add New
            </Button>
          )}
        </ul>
      )}

      {showColorPalette && selectedRow && (
        <ColorPalette
          onClose={handleColorPaletteClose}
          setColorSelect={({ id, value, color }: any) => {
            setColorSelect({ id, value, color })
          }}
          selectedRow={selectedRow}
        />
      )}
    </div>
  )
}
