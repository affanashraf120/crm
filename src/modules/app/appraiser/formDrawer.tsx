'use client'

import { useState } from 'react'

// MUI Imports
import { Button, Card, CardContent, Grid } from '@mui/material'

// Third-party Imports
import type { z } from 'zod'

// Type Imports
import ConfirmationDialog from '@/components/dialogs/confirmation-dialog'
import { useSideBarForm } from '@/components/validation/appraisalSideBar/hookForm'

import FormGenerator from '@/components/formDrawer/form'
import type { schema } from '@/components/validation/appraisalSideBar/sideBarFormSchema'

type FormData = z.infer<typeof schema>

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
    console.log('🚀 ~ onSubmit ~ data:', data)

    // setRowSelection(data)
  }

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className=' w-full flex flex-col gap-3 '>
          <Grid container spacing={3}>
            {formFields &&
              formFields.map((field, index) => (
                <Grid item xs={12} md={field.type === 'formTextArea' ? 12 : 6} key={index}>
                  <Title icon={field.icon} label={field.title} />
                  <FormGenerator
                    field={field}
                    control={control}
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    fieldSize={field.fieldSize}
                  />
                </Grid>
              ))}
          </Grid>

          <div className='flex justify-start gap-4 items-center py-4'>
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
            type='clear'
            title='Are you sure you want to clear the form data?'
          />
        </form>
      </CardContent>
    </Card>
  )
}

export default AppraiserForm

const Title = ({ label }: { icon: string; label: string }) => {
  return (
    <div className='col-span-12 md:col-span-4 flex justify-start items-start gap-2 text-sm pb-2'>
      {/* <i className={` w-4 h-4 mt-0.5 ${icon}`}></i> */}
      {label}
    </div>
  )
}

const formFields = [
  {
    type: 'formInput',
    name: 'inv',
    label: 'Enter Invoice...',
    title: 'Invoice',
    icon: 'ri-pages-line',
    disable: true,
    fieldSize: 'medium'
  },
  {
    type: 'formInput',
    name: 'claim_number',
    label: 'Enter Claim Number...',
    title: 'Claim Number',
    icon: 'ri-clapperboard-line',
    fieldSize: 'medium'
  },
  {
    type: 'formInput',
    name: 'client_name',
    label: 'Enter Name...',
    title: 'Name',
    icon: 'ri-account-box-line',
    fieldSize: 'medium'
  },
  {
    type: 'formInput',
    name: 'email',
    label: 'Enter Email...',
    title: 'Email',
    icon: 'ri-mail-line',
    fieldSize: 'medium'
  },
  {
    type: 'statusDropdown',
    name: 'status',
    title: 'Status',
    icon: 'ri-album-fill',
    options: [
      { id: 1, value: 'Closed', color: 'info' },
      { id: 2, value: 'Roof Bought', color: 'info' },
      { id: 3, value: 'Open', color: 'success' },
      { id: 4, value: 'Demand Received', color: 'success' },
      { id: 5, value: 'Scheduling Inspection', color: 'default' },
      { id: 6, value: 'Umpire', color: 'primary' },
      { id: 7, value: 'Inspection Scheduled', color: 'primary' }
    ],
    fieldSize: 'medium'
  },

  {
    type: 'formInputSearchDropdown',
    name: 'assigned_to',
    label: 'Default',
    title: 'Assigned to',
    icon: 'ri-check-line',
    options: ['joen deo', 'harry'],
    fieldSize: 'medium'
  },
  {
    type: 'formCalendarPicker',
    name: 'date_sent',
    label: 'Date',
    title: 'Date Sent',
    icon: 'ri-calendar-event-line',
    fieldSize: 'medium'
  },
  {
    type: 'formInputSearchDropdown',
    name: 'carrier',
    label: 'Enter Carrier...',
    title: 'Carrier',
    icon: 'ri-bar-chart-2-fill',
    options: ['carrier', 'carrier 2'],
    fieldSize: 'medium'
  },
  {
    type: 'formInputSearchDropdown',
    name: 'city',
    label: 'Enter City...',
    title: 'City',
    icon: 'ri-building-2-fill',
    options: ['city', 'city 2'],
    fieldSize: 'medium'
  },
  {
    type: 'formInput',
    name: 'oa_name',
    label: 'Enter Name...',
    title: 'OA Name',
    icon: 'ri-bar-chart-horizontal-line',
    fieldSize: 'medium'
  },
  {
    type: 'formInput',
    name: 'oa_email',
    label: 'Enter Email...',
    title: 'OA Email',
    icon: 'ri-mail-line',
    fieldSize: 'medium'
  },
  {
    type: 'formInput',
    name: 'oa_phone_no',
    label: 'Enter Number...',
    title: 'OA Phone Number',
    icon: 'ri-phone-line',
    fieldSize: 'medium'
  },
  {
    type: 'statusDropdown',
    name: 'umpire_status',
    title: 'Umpire Status',
    icon: 'ri-album-fill',
    options: [
      { id: 1, value: 'Initiated', color: 'info' },
      { id: 2, value: 'W9 & Invoice Received', color: 'info' },
      { id: 3, value: 'Payment Sent', color: 'success' },
      { id: 4, value: 'Trying To Schedule', color: 'success' },
      { id: 5, value: 'Inspection Scheduled', color: 'default' },
      { id: 6, value: 'Roof Bought', color: 'primary' },
      { id: 7, value: 'Roof Denied', color: 'primary' }
    ],
    fieldSize: 'medium'
  },
  {
    type: 'formInputSearchDropdown',
    name: 'umpire_name',
    label: 'Enter Umpire Name...',
    title: 'Umpire Name',
    icon: 'ri-account-circle-line',
    options: ['harry', 'potter'],
    fieldSize: 'medium'
  },
  {
    type: 'formInput',
    name: 'umpire_email',
    label: 'Enter Email...',
    title: 'Umpire Email',
    icon: 'ri-mail-line',
    fieldSize: 'medium'
  },
  {
    type: 'formInput',
    name: 'umpire_phone_no',
    label: 'Enter Number...',
    title: 'Umpire Phone Number',
    icon: 'ri-phone-line',
    fieldSize: 'medium'
  },
  {
    type: 'formCalendarPicker',
    name: 'inspection_date',
    label: 'Date',
    title: 'Inspection Date',
    icon: 'ri-calendar-event-line',
    fieldSize: 'medium'
  },

  {
    type: 'formInput',
    name: 'appraisal_amt',
    label: 'Enter Appraisal Amount...',
    title: 'Appraisal Amount',
    icon: 'ri-money-dollar-circle-line',
    inputIcon: '$',
    fieldSize: 'medium'
  },
  {
    type: 'formInput',
    name: 'percentage',
    label: 'Enter Percentage...',
    title: 'Percentage',
    icon: 'ri-percent-line',
    inputIcon: '%',
    fieldSize: 'medium'
  },
  {
    type: 'formCalendarPicker',
    name: 'date_approved',
    label: 'Date',
    title: 'Date Approved',
    icon: 'ri-calendar-event-line',
    fieldSize: 'medium'
  },
  {
    type: 'formInput',
    name: 'turnaround',
    label: 'Enter Turnaround...',
    title: 'Turnaround',
    icon: 'ri-loop-right-fill',
    fieldSize: 'medium'
  },
  {
    type: 'formInput',
    name: 'comm_amt',
    label: 'Enter Commission Amount...',
    title: 'Commission Amount',
    icon: 'ri-money-dollar-circle-line',
    inputIcon: '$',
    fieldSize: 'medium'
  },
  {
    type: 'formCalendarPicker',
    name: 'date_qb_invoiced',
    label: 'Date',
    title: 'Date QB Invoiced',
    icon: 'ri-calendar-event-line',
    fieldSize: 'medium'
  },
  {
    type: 'formCalendarPicker',
    name: 'date_user_paid',
    label: 'Date User Paid',
    title: 'Date User Paid',
    icon: 'ri-money-dollar-circle-line',
    fieldSize: 'medium'
  },
  {
    type: 'formTextArea',
    name: 'address',
    label: 'Enter Address...',
    title: 'Address',
    icon: 'ri-user-location-line',
    fieldSize: 'medium'
  },
  {
    type: 'formTextArea',
    name: 'notes',
    label: 'Enter Notes...',
    title: 'Notes',
    icon: 'ri-sticky-note-fill',
    fieldSize: 'medium'
  }
]
