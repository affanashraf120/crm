import React, { useState } from 'react'

import TextField from '@mui/material/TextField'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import type { Dayjs } from 'dayjs'
import { Button } from '@mui/material'

const DateRangePicker = ({ onSave, name, classes, label, buttonType }: any) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null)
  const [endDate, setEndDate] = useState<Dayjs | null>(null)
  const [focusedInput, setFocusedInput] = useState<'start' | 'end' | null>('start')

  const handleStartDateChange = (date: Dayjs | null) => {
    setStartDate(date)

    if (date && (!endDate || date.isAfter(endDate))) {
      setEndDate(null) // Reset end date if the new start date is after the current end date
    }

    setFocusedInput('end')
  }

  const handleEndDateChange = (date: Dayjs | null) => {
    setEndDate(date)
    setFocusedInput(null)
  }

  const disableEndDate = (date: Dayjs) => {
    return !!startDate && date.isBefore(startDate, 'day')
  }

  const handleSave = () => {
    onSave({
      searchItem: { startDate: startDate?.format('YYYY-MM-DD'), endDate: endDate?.format('YYYY-MM-DD') },
      name: name
    })
  }

  const handleClear = () => {
    setStartDate(null)
    setEndDate(null)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={`flex flex-col gap-2 `}>
        <div className={`${classes}`}>
          <DatePicker
            label='Start Date'
            value={startDate}
            onChange={handleStartDateChange}
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
            slots={{
              textField: TextField
            }}
            slotProps={{
              textField: {
                onFocus: () => setFocusedInput('start'),
                autoFocus: focusedInput === 'start',
                size: 'small'
              }
            }}
          />
          {label && <span>- {label} -</span>}
          <DatePicker
            label='End Date'
            value={endDate}
            onChange={handleEndDateChange}
            shouldDisableDate={disableEndDate}
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
            slots={{
              textField: TextField
            }}
            slotProps={{
              textField: {
                onFocus: () => setFocusedInput('end'),
                autoFocus: focusedInput === 'end',
                size: 'small'
              }
            }}
          />
        </div>
        {buttonType ? (
          <div className='flex justify-between items-center '>
            <Button variant='outlined' color='inherit' onClick={handleClear} >
              Clear
            </Button>
            <Button variant='contained' onClick={handleSave} >
              Save
            </Button>
          </div>
        ) : (
          <div className='flex justify-between items-center '>
            <span onClick={handleClear} className='flex justify-end items-end text-secondary py-2 cursor-pointer'>
              Clear
            </span>
            <span onClick={handleSave} className='flex justify-end items-end  text-primary py-2 cursor-pointer'>
              Save
            </span>
          </div>
        )}
      </div>
    </LocalizationProvider>
  )
}

export default DateRangePicker
