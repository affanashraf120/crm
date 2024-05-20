import React from 'react'

import { FormGroup, Checkbox } from '@mui/material'

import type { Control } from 'react-hook-form'
import { Controller } from 'react-hook-form'

interface FormCheckBoxProps {
  control: Control<any>
  name: string
}

const FormCheckBox: React.FC<FormCheckBoxProps> = ({ control, name }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormGroup row>
          <Checkbox
            {...field}
            sx={{
              padding: '0px'
            }}
          />
        </FormGroup>
      )}
    />
  )
}

export default FormCheckBox
