import React, { useState } from 'react'

import TextField from '@mui/material/TextField'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import type { Dayjs } from 'dayjs'

const DateRangePicker = ({ onSave, name }: any) => {
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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='flex flex-col gap-2'>
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
        <span onClick={handleSave} className='flex justify-end items-end pe-4 text-primary py-2 cursor-pointer'>
          Save
        </span>
      </div>
    </LocalizationProvider>
  )
}

export default DateRangePicker
