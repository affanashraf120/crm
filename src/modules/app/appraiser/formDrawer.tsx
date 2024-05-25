'use client'

import { useState } from 'react'

// MUI Imports
import { Button, Input } from '@mui/material'

// Third-party Imports
import type { z } from 'zod'

// Type Imports
import ConfirmationDialog from '@/components/dialogs/confirmation-dialog'
import { FormCalendarPicker } from '@/components/formComponents/formCalenderPiker'
import { FormInput } from '@/components/formComponents/formInput'
import { FormInputSearchDropdown } from '@/components/formComponents/formInputSearchDropdown'
import { FormTextArea } from '@/components/formComponents/formTextArea'
import { StatusDropdown } from '@/components/formComponents/statusDropdown'
import { useSideBarForm } from '@/components/validation/appraisalSideBar/hookForm'

import type { schema } from '@/components/validation/appraisalSideBar/sideBarFormSchema'

type FormData = z.infer<typeof schema>

// // Types

// type SliderInputModalProps = {
//   breakpoint?: Breakpoint | 'xxl' | `${number}px` | `${number}rem` | `${number}em`
//   dir?: Direction
//   disableDirection?: boolean
//   open: boolean
//   setOpen: (open: boolean) => void
//   clientName: string
//   setRowSelection: React.Dispatch<React.SetStateAction<FormData | null>>
// }

const AppraiserForm = () => {
  // States
  const [openClearModal, setopenClearModal] = useState(false)

  const clientName = 'Alpha'

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue
  } = useSideBarForm(clientName)

  const onSubmit = (data: FormData) => {
    console.log("🚀 ~ onSubmit ~ data:", data)

    // setRowSelection(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='px-6 w-full flex flex-col gap-3 '>
      <Input
        fullWidth
        type='text'
        placeholder='Name'
        {...register('client_name')}
        error={!!errors.client_name}
        sx={{
          fontSize: '20px',
          fontWeight: '600'
        }}
      />

      <div className='grid grid-cols-12 mt-10 gap-3 md:gap-0'>
        <Title icon='ri-pages-line' label='Invoice' />
        <div className='col-span-12 md:col-span-8 flex justify-start items-center gap-2 text-sm'>
          <FormInput
            label='Enter Invoice...'
            register={register('inv')}
            error={!!errors.inv}
            helperText={errors.inv?.message}
            disable={true}
          />{' '}
        </div>
      </div>

      <div className='grid grid-cols-12 gap-3 md:gap-0'>
        <Title icon='ri-mail-line' label='Email' />
        <div className='col-span-12 md:col-span-8 flex justify-start items-center gap-2 text-sm'>
          <FormInput
            label='Enter Email...'
            register={register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />{' '}
        </div>
      </div>

      <div className='grid grid-cols-12 gap-3 md:gap-0'>
        <Title icon='ri-album-fill' label='Status' />

        <div className='col-span-12 md:col-span-8 flex justify-start items-center gap-2 text-sm'>
          <StatusDropdown
            register={register}
            name='status'
            setValue={setValue}
            options={[
              { id: 1, value: 'Closed', color: 'info' },
              { id: 2, value: 'Roof Bought', color: 'info' },
              { id: 3, value: 'Open', color: 'success' },
              { id: 4, value: 'Demand Received', color: 'success' },
              { id: 5, value: 'Scheduling Inspection', color: 'default' },
              { id: 6, value: 'Umpire', color: 'primary' },
              { id: 7, value: 'Inspection Scheduled', color: 'primary' }
            ]}
          />
        </div>
      </div>

      <div className='grid grid-cols-12 gap-3 md:gap-0'>
        <Title icon='ri-clapperboard-line' label='Claim Number' />

        <div className='col-span-12 md:col-span-8 flex justify-start items-center gap-2 text-sm'>
          <FormInput
            label='Enter Claim Number...'
            register={register('claim_number')}
            error={!!errors.claim_number}
            helperText={errors.claim_number?.message}
          />{' '}
        </div>
      </div>

      <div className='grid grid-cols-12 gap-3 md:gap-0'>
        <Title icon='ri-check-line' label='Assigned to' />

        <div className='col-span-12 md:col-span-8 flex justify-start items-center gap-2 text-sm'>
          <FormInputSearchDropdown
            control={control}
            name='assigned_to'
            label='Default'
            options={['joen deo', 'harry']}
          />
        </div>
      </div>

      <div className='grid grid-cols-12 gap-3 md:gap-0'>
        <Title icon='ri-calendar-event-line' label='Date Sent' />

        <div className='col-span-12 md:col-span-8 flex justify-start items-center gap-2 text-sm'>
          <FormCalendarPicker name='date_sent' control={control} label='Date' />
        </div>
      </div>

      <div className='grid grid-cols-12 gap-3 md:gap-0'>
        <Title icon='ri-bar-chart-2-fill' label='Carrier' />

        <div className='col-span-12 md:col-span-8 flex justify-start items-center gap-2 text-sm'>
          <FormInputSearchDropdown
            control={control}
            name='carrier'
            label='Enter Carrier...'
            options={['carrier', 'carrier 2']}
          />
        </div>
      </div>

      <div className='grid grid-cols-12 gap-3 md:gap-0'>
        <Title icon='ri-building-2-fill' label='City' />

        <div className='col-span-12 md:col-span-8 flex justify-start items-center gap-2 text-sm'>
          <FormInputSearchDropdown control={control} name='city' label='Enter City...' options={['city', 'city 2']} />
        </div>
      </div>

      <div className='grid grid-cols-12 gap-3 md:gap-0'>
        <Title icon='ri-bar-chart-horizontal-line' label='OA Name' />

        <div className='col-span-12 md:col-span-8 flex justify-start items-center gap-2 text-sm'>
          <FormInput
            label='Enter Name...'
            register={register('oa_name')}
            error={!!errors.oa_name}
            helperText={errors.oa_name?.message}
          />{' '}
        </div>
      </div>

      <div className='grid grid-cols-12 gap-3 md:gap-0'>
        <Title icon='ri-mail-line' label='OA Email' />

        <div className='col-span-12 md:col-span-8 flex justify-start items-center gap-2 text-sm'>
          <FormInput
            label='Enter Email...'
            register={register('oa_email')}
            error={!!errors.oa_email}
            helperText={errors.oa_email?.message}
          />
        </div>
      </div>

      <div className='grid grid-cols-12 gap-3 md:gap-0'>
        <Title icon='ri-phone-line' label='OA Phone Number' />

        <div className='col-span-12 md:col-span-8 flex justify-start items-center gap-2 text-sm'>
          <FormInput
            label='Enter Number...'
            register={register('oa_phone_no')}
            error={!!errors.oa_phone_no}
            helperText={errors.oa_phone_no?.message}
          />
        </div>
      </div>

      <div className='grid grid-cols-12 gap-3 md:gap-0'>
        <Title icon='ri-album-fill' label='Umpire Status' />

        <div className='col-span-12 md:col-span-8 flex justify-start items-center gap-2 text-sm'>
          <StatusDropdown
            register={register}
            name='umpire_status'
            setValue={setValue}
            options={[
              { id: 1, value: 'Initiated', color: 'info' },
              { id: 2, value: 'W9 & Invoice Received', color: 'info' },
              { id: 3, value: 'Payment Sent', color: 'success' },
              { id: 4, value: 'Trying To Schedule', color: 'success' },
              { id: 5, value: 'Inspection Scheduled', color: 'default' },
              { id: 6, value: 'Roof Bought', color: 'primary' },
              { id: 7, value: 'Roof Denied', color: 'primary' }
            ]}
          />
        </div>
      </div>

      <div className='grid grid-cols-12 gap-3 md:gap-0'>
        <Title icon='ri-account-circle-line' label='Umpire Name' />

        <div className='col-span-12 md:col-span-8 flex justify-start items-center gap-2 text-sm'>
          <FormInputSearchDropdown
            control={control}
            name='umpire_name'
            label='Enter Umpire Name...'
            options={['harry', 'potter']}
          />
        </div>
      </div>

      <div className='grid grid-cols-12 gap-3 md:gap-0'>
        <Title icon='ri-mail-line' label='Umpire Email' />

        <div className='col-span-12 md:col-span-8 flex justify-start items-center gap-2 text-sm'>
          <FormInput
            label='Enter Email...'
            register={register('umpire_email')}
            error={!!errors.umpire_email}
            helperText={errors.umpire_email?.message}
          />
        </div>
      </div>

      <div className='grid grid-cols-12 gap-3 md:gap-0'>
        <Title icon='ri-phone-line' label='Umpire Phone Number' />

        <div className='col-span-12 md:col-span-8 flex justify-start items-center gap-2 text-sm'>
          <FormInput
            label='Enter Number...'
            register={register('umpire_phone_no')}
            error={!!errors.umpire_phone_no}
            helperText={errors.umpire_phone_no?.message}
          />
        </div>
      </div>

      <div className='grid grid-cols-12 gap-3 md:gap-0'>
        <Title icon='ri-calendar-event-line' label='Inspection Date' />

        <div className='col-span-12 md:col-span-8 flex justify-start items-center gap-2 text-sm'>
          <FormCalendarPicker name='inspection_date' control={control} label='Date ' />
        </div>
      </div>

      <div className='grid grid-cols-12 gap-3 md:gap-0'>
        <Title icon='ri-user-location-line' label='Address' />

        <div className='col-span-12 md:col-span-8 flex justify-start items-center gap-2 text-sm'>
          <FormTextArea
            label='Enter Address...'
            register={register('address')}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
        </div>
      </div>

      <div className='grid grid-cols-12 gap-3 md:gap-0'>
        <Title icon='ri-money-dollar-circle-line' label='Appraisal Amount' />

        <div className='col-span-12 md:col-span-8 flex justify-start items-center gap-2 text-sm'>
          <FormInput
            label='Enter Appraisal Amount... '
            register={register('appraisal_amt')}
            error={!!errors.appraisal_amt}
            helperText={errors.appraisal_amt?.message}
            icon='$'
          />
        </div>
      </div>
      <div className='grid grid-cols-12 gap-3 md:gap-0'>
        <Title icon='ri-percent-line' label='Percentage' />

        <div className='col-span-12 md:col-span-8 flex justify-start items-center gap-2 text-sm'>
          <FormInput
            label='Enter Percentage... '
            register={register('percentage')}
            error={!!errors.percentage}
            helperText={errors.percentage?.message}
            icon='%'
          />
        </div>
      </div>

      <div className='grid grid-cols-12 gap-3 md:gap-0'>
        <Title icon='ri-calendar-event-line' label='Date Approved' />

        <div className='col-span-12 md:col-span-8 flex justify-start items-center gap-2 text-sm'>
          <FormCalendarPicker name='date_approved' control={control} label='Date' />
        </div>
      </div>

      <div className='grid grid-cols-12 gap-3 md:gap-0'>
        <Title icon='ri-loop-right-fill' label='Turnaround' />

        <div className='col-span-12 md:col-span-8 flex justify-start items-center gap-2 text-sm'>
          <FormInput
            label='Enter Turnaround... '
            register={register('turnaround')}
            error={!!errors.turnaround}
            helperText={errors.turnaround?.message}
          />
        </div>
      </div>

      <div className='grid grid-cols-12 gap-3 md:gap-0'>
        <Title icon='ri-money-dollar-circle-line' label='Commission Amount' />

        <div className='col-span-12 md:col-span-8 flex justify-start items-center gap-2 text-sm'>
          <FormInput
            label='Enter Commission Amount... '
            register={register('comm_amt')}
            error={!!errors.turnaround}
            helperText={errors.turnaround?.message}
            icon='$'
          />
        </div>
      </div>

      <div className='grid grid-cols-12 gap-3 md:gap-0'>
        <Title icon='ri-calendar-event-line' label='Date QB Invoiced' />

        <div className='col-span-12 md:col-span-8 flex justify-start items-center gap-2 text-sm'>
          <FormCalendarPicker name='date_qb_invoiced' control={control} label='Date' />
        </div>
      </div>

      <div className='grid grid-cols-12 gap-3 md:gap-0'>
        <Title icon='ri-money-dollar-circle-line' label='Date User Paid' />

        <div className='col-span-12 md:col-span-8 flex justify-start items-center gap-2 text-sm'>
          <FormCalendarPicker name='date_user_paid' control={control} label='Date User Paid' />
        </div>
      </div>

      <div className='grid grid-cols-12 gap-3 md:gap-0'>
        <Title icon='ri-sticky-note-fill' label='Notes' />
        <div className='col-span-12 md:col-span-8 flex justify-start items-center gap-2 text-sm'>
          <FormTextArea
            label='Enter Notes...'
            register={register('notes')}
            error={!!errors.notes}
            helperText={errors.notes?.message}
          />
        </div>
      </div>

      <div className='flex justify-between items-center py-4'>
        <Button variant='outlined' color='inherit' onClick={() => setopenClearModal(true)}>
          Clear
        </Button>
        <Button type='submit' variant='contained' color='primary'>
          Submit
        </Button>
      </div>
      <ConfirmationDialog
        open={openClearModal}
        setOpen={() => setopenClearModal(false)}
        type='delete-account'
        title='Are you sure you want to clear the form data?'
      />
    </form>
  )
}

export default AppraiserForm

const Title = ({ icon, label }: { icon: string; label: string }) => {
  return (
    <div className='col-span-12 md:col-span-4 flex justify-start items-start gap-2 text-sm'>
      <i className={` w-4 h-4 mt-0.5 ${icon}`}></i>
      {label}
    </div>
  )
}
