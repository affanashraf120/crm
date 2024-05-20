import React from 'react'

import { TextField } from '@mui/material'

import type { UseFormRegisterReturn } from 'react-hook-form'

interface FormTextAreaProps {
  label: string
  type?: string
  error?: boolean
  helperText?: React.ReactNode
  register: UseFormRegisterReturn
}

export const FormTextArea: React.FC<FormTextAreaProps> = ({ label, type = 'text', error, helperText, register }) => {
  return (
    <TextField
      size='small'
      label={label}
      type={type}
      fullWidth
      {...register}
      error={error}
      helperText={helperText}
      multiline
      minRows={3}
    />
  )
}
