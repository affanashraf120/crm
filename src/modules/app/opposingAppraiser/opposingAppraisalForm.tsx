
import React, { useState } from 'react'

// Mui Imports
import { Button } from '@mui/material'

// Import UseForm
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// Custom components
import { FormInput } from '@/components/formComponents/formInput'
import { ActionsDialog } from '@/components/dialogBox/deleteDialogBox'

const schema = z.object({
  oa_name: z.string(),
  oa_email: z.string(),
  oa_phone_no: z.string()
})

type FormData = z.infer<typeof schema>

const onSubmit = (data: FormData) => {
  console.log(data)
}

 const OpposingAppraisalForm = () => {
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      oa_name: '',
      oa_email: '',
      oa_phone_no: ''
    }
  })

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='px-4 w-full flex flex-col gap-3 h-full'>
        <div className='h-full flex justify-between flex-col '>
          <div className='flex flex-col gap-3'>
            <div className='grid grid-cols-12  gap-3 md:gap-0 mt-10'>
              <Title icon='ri-bar-chart-horizontal-line' label='OA Name' />
              <div className='col-span-12 md:col-span-8 flex justify-start items-center gap-2 text-sm'>
                <FormInput
                  label='Enter Opposing Appraisal...'
                  register={register('oa_name')}
                  error={!!errors.oa_name}
                  helperText={errors.oa_name?.message}
                />{' '}
              </div>
            </div>

            <div className='grid grid-cols-12  gap-3 md:gap-0'>
              <Title icon='ri-mail-line' label='OA Email' />
              <div className='col-span-12 md:col-span-8 flex justify-start items-center gap-2 text-sm'>
                <FormInput
                  label='Enter Email...'
                  register={register('oa_email')}
                  error={!!errors.oa_email}
                  helperText={errors.oa_email?.message}
                />{' '}
              </div>
            </div>

            <div className='grid grid-cols-12  gap-3 md:gap-0'>
              <Title icon='ri-phone-line' label='OA Phone Number' />
              <div className='col-span-12 md:col-span-8 flex justify-start items-center gap-2 text-sm'>
                <FormInput
                  label='Enter Phone Number...'
                  register={register('oa_phone_no')}
                  error={!!errors.oa_phone_no}
                  helperText={errors.oa_phone_no?.message}
                />{' '}
              </div>
            </div>
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

      <ActionsDialog
        open={open}
        onClose={() => setOpen(false)}
        title='Are you sure you want to clear the form data?'
        actions={[
          { label: 'Delete', onClick: () => setOpen(false), color: 'error' },
          { label: 'Cancel', onClick: () => setOpen(false), color: 'inherit' }
        ]}
      />
    </>
  )
}

export default OpposingAppraisalForm

const Title = ({ icon, label }: { icon: string; label: string }) => {
  return (
    <div className='col-span-12 md:col-span-4 flex justify-start items-start gap-2 text-sm'>
      <i className={` w-4 h-4 mt-0.5 ${icon}`}></i>
      {label}
    </div>
  )
}
