import React from 'react'

import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

import type { Control } from 'react-hook-form'
import { Controller } from 'react-hook-form'

// Define the props type for the component
interface FormCalendarPickerProps {
  control: Control<any>
  name: string
  label: string
}

export const FormCalendarPicker: React.FC<FormCalendarPickerProps> = ({ control, name, label }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']} sx={{ width: '100%' }}>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <DatePicker
              label={label}
              value={field.value}
              inputRef={field.ref}
              onChange={date => field.onChange(date)}
              slotProps={{ textField: { size: 'small' } }}
              sx={{ width: '100%' }}
              format='YYYY-MM-DD'
            />
          )}
        />
      </DemoContainer>
    </LocalizationProvider>
  )
}