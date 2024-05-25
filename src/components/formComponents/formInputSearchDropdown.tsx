// Import state
import { useState } from 'react'

// Third party library for validation
import { Controller } from 'react-hook-form'

// Import Mui
import { Autocomplete, Button, IconButton, Paper, TextField } from '@mui/material'

// Import tamplate theme
import { useSettings } from '@/@core/hooks/useSettings'
import ConfirmationDialog from '../dialogs/confirmation-dialog'

export const FormInputSearchDropdown = ({ control, name, label, options, icon }: any) => {
  const [value, setValue] = useState('')

  const [isValueExist, setisValueExist] = useState(false)

  const { settings } = useSettings()
  const [open, setOpen] = useState(false)

  

  const addNewData = () => {
    console.log('🚀 ~ FormInputSearchDropdown ~ value:', value)
  }

  const handleinput = (e: any) => {
    const input = e.target.value

    // Vlaue save in the state
    setValue(input)

    if (!input.includes(value.toLowerCase())) {
      setisValueExist(false)
    } else setisValueExist(true)
  }

  return (
    <div className='relative w-full'>
      {icon && <span className='absolute left-3 top-2'>{icon}</span>}

      <Controller
        name={name}
        control={control}
        rules={{
          required: 'Please enter something'
        }}
        render={({ field, fieldState }) => (
          <Autocomplete
            {...field}
            fullWidth
            size='small'
            options={options}
            disableClearable={true}
            renderOption={(props, option) => (
              <span
                className={`flex justify-between items-center w-full px-4 py-2 duration-300 ease-in-out transition-all
                      ${settings.mode === 'dark' ? 'hover:bg-[#37334C]' : 'hover:bg-[#E5E5EB]'}
                      `}
                {...props}
              >
                <div className='flex justify-between items-center w-full'>
                  <div className='flex justify-center items-center gap-2'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='1.3em' height='1.3em' viewBox='0 0 256 256'>
                      <path
                        fill='currentColor'
                        d='M108 60a16 16 0 1 1-16-16a16 16 0 0 1 16 16m56 16a16 16 0 1 0-16-16a16 16 0 0 0 16 16m-72 36a16 16 0 1 0 16 16a16 16 0 0 0-16-16m72 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16m-72 68a16 16 0 1 0 16 16a16 16 0 0 0-16-16m72 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16'
                      />
                    </svg>
                    <span>{option}</span>
                  </div>
                  <IconButton onClick={() => setOpen(true)}>
                    <i className='ri-delete-bin-6-line w-4 h-4' />
                  </IconButton>{' '}
                </div>
              </span>
            )}
            renderInput={params => (
              <TextField
                {...params}
                label={label}
                variant='outlined'
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                onChange={handleinput}
              />
            )}
            PaperComponent={({ children }) => {
              return (
                <Paper>
                  {children}
                  {isValueExist && (
                    <Button
                      color='primary'
                      fullWidth
                      sx={{ justifyContent: 'flex-start', pl: 2 }}
                      onMouseDown={addNewData}
                    >
                      + Add New
                    </Button>
                  )}
                </Paper>
              )
            }}
            onChange={(_, data) => field.onChange(data)}
          />
        )}
      />
      <ConfirmationDialog
        open={open}
        setOpen={setOpen}
        type='delete-account'
        title='Are you sure you want to delete this item?'
      />
    </div>
  )
}
