'use client'

import { useState } from 'react'

// Mui Imports
import { Button } from '@mui/material'

// Import UseForm
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// Custom components
import ConfirmationDialog from '@/components/dialogs/confirmation-dialog'
import FormGenerator from '@/components/formDrawer/form'

const schema = z.object({
  umpire_name: z.string(),
  umpire_email: z.string(),
  umpire_phone_no: z.string()
})

type FormData = z.infer<typeof schema>

const onSubmit = (data: FormData) => {
  console.log(data)
}

const UmpireInfoForm = () => {
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      umpire_name: '',
      umpire_email: '',
      umpire_phone_no: ''
    }
  })

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='px-4 w-full flex flex-col gap-3 h-full'>
        <div className='h-full flex justify-between flex-col '>
          <div className='flex flex-col gap-3 mt-10'>
            {formFields &&
              formFields.map((field, index) => (
                <div className='grid grid-cols-12  gap-3 md:gap-0 ' key={index}>
                  <Title icon={field.icon} label={field.title} />
                  <div className='col-span-12 md:col-span-8 flex justify-start items-center gap-2 text-sm'>
                    <FormGenerator field={field} register={register} errors={errors} />
                  </div>
                </div>
              ))}
            {/* <div className='grid grid-cols-12  gap-3 md:gap-0 mt-10'>
              <Title icon='ri-bar-chart-horizontal-line' label='Umpire Name' />
              <div className='col-span-12 md:col-span-8 flex justify-start items-center gap-2 text-sm'>
                <FormInput
                  label='Enter Umpire Name...'
                  register={register('umpire_name')}
                  error={!!errors.umpire_name}
                  helperText={errors.umpire_name?.message}
                />{' '}
              </div>
            </div>

            <div className='grid grid-cols-12  gap-3 md:gap-0'>
              <Title icon='ri-mail-line' label='Umpire Email' />
              <div className='col-span-12 md:col-span-8 flex justify-start items-center gap-2 text-sm'>
                <FormInput
                  label='Enter Email...'
                  register={register('umpire_email')}
                  error={!!errors.umpire_email}
                  helperText={errors.umpire_email?.message}
                />{' '}
              </div>
            </div>

            <div className='grid grid-cols-12  gap-3 md:gap-0'>
              <Title icon='ri-phone-line' label='Umpire Phone Number' />
              <div className='col-span-12 md:col-span-8 flex justify-start items-center gap-2 text-sm'>
                <FormInput
                  label='Enter Phone Number...'
                  register={register('umpire_phone_no')}
                  error={!!errors.umpire_phone_no}
                  helperText={errors.umpire_phone_no?.message}
                />{' '}
              </div>
            </div> */}
          </div>

          <div className='py-4 flex justify-between items-center'>
            <Button variant='outlined' color='inherit' onClick={() => setOpen(true)}>
              Cancel
            </Button>
            <Button type='submit' variant='contained' color='primary'>
              Submit
            </Button>
          </div>
        </div>
      </form>

      <ConfirmationDialog
        open={open}
        setOpen={setOpen}
        type='delete-account'
        title='Are you sure you want to clear the form data?'
      />
    </>
  )
}

export default UmpireInfoForm

const Title = ({ icon, label }: { icon: string; label: string }) => {
  return (
    <div className='col-span-12 md:col-span-4 flex justify-start items-start gap-2 text-sm'>
      <i className={` w-4 h-4 mt-0.5 ${icon}`}></i>
      {label}
    </div>
  )
}

const formFields = [
  {
    type: 'formInput',
    name: 'umpire_name',
    label: 'Enter Umpire Name...',
    title: 'umpire Name',
    icon: 'ri-bar-chart-horizontal-line'
  },
  { type: 'formInput', name: 'umpire_email', label: 'Enter Email...', title: 'umpire Email', icon: 'ri-mail-line' },
  {
    type: 'formInput',
    name: 'umpire_phone_no',
    label: 'Enter Phone No...',
    title: 'umpire Phone No',
    icon: 'ri-phone-line'
  }
]
