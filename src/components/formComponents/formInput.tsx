import { TextField } from '@mui/material'

export const FormInput = ({ label, type = 'text', error, helperText, register, disable, icon, fieldSize }: any) => {
  const inputProps = icon ? { style: { paddingLeft: '12px' } } : { style: { paddingLeft: '0px' } }

  return (
    <div className='relative w-full'>
      {icon && <span className='absolute left-3 top-2'>{icon}</span>}
      <TextField
        size={fieldSize ? fieldSize : 'small'}
        label={label}
        type={type}
        fullWidth
        {...register}
        error={error}
        helperText={helperText}
        disabled={disable}
        InputProps={inputProps}
        InputLabelProps={icon && { shrink: true }}
      />
    </div>
  )
}
