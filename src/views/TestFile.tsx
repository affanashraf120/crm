import React from 'react'

import { useFormContext } from 'react-hook-form'

// Your existing component code...

export const TestFile = () => {
  const { handleSubmit, register, setValue } = useFormContext() // Access form context
  const name = 'asad'

  // Existing state and functions...

  // Clicked item or chip
  const handleItemClick = () => {
    const item = { id: 1, name: 'asad', color: '23432' }

    setValue(name, item) // Pass selected object to React Hook Form
  }

  const onSubmit = (data: any) => {
    console.log('🚀 ~ onSubmit ~ data:', data)

    // setOpen(false)
    // setRowSelection(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='px-4 w-full flex flex-col gap-3'>
      <input {...register(name)} />

      <button type='button' onClick={handleItemClick}>
        Click to set value
      </button>

      <button type='submit'>Submit</button>
    </form>
  )
}
