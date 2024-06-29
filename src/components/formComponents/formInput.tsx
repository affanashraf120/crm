import { TextField } from '@mui/material'

export const FormInput = ({
  label,
  type = 'text',
  error,
  helperText,
  register,
  disable,
  inputIcon,
  fieldSize
}: any) => {
  const inputProps = inputIcon ? { style: { paddingLeft: '12px' } } : { style: { paddingLeft: '0px' } }

  return (
    <div className='relative w-full'>
      {inputIcon && <span className='absolute left-3 top-4'>{inputIcon}</span>}
      <TextField
        size={fieldSize ? fieldSize : 'small'}
        placeholder={label}
        type={type}
        fullWidth
        {...register}
        error={error}
        helperText={helperText}
        disabled={disable}
        InputProps={inputProps}
        InputLabelProps={inputIcon && { shrink: true }}
      />
    </div>
  )
}
