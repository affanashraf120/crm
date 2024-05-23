import React from 'react'

// Mui Imports
import { Button, Dialog, DialogTitle, Grid } from '@mui/material'

// Import UseForm
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// Custom components
import { FormInput } from '@/components/formComponents/formInput'
import FileInput from '@/components/formComponents/formInputFile'
import { FormTextArea } from '@/components/formComponents/formTextArea'

interface ModalProps {
  open: boolean
  onClose: () => void
}

const schema = z.object({
  com_name: z.string(),
  com_address: z.string(),
  com_logo: z
  .any()
  .refine(file => file instanceof File, 'You must select a file.'),
  owner_name: z.string(),
  owner_phone_no: z.string(),
  owner_email: z.string(),
  gm_sale_name: z.string(),
  gm_sale_phone_no: z.string(),
  gm_sale_email: z.string(),
  client_username: z.string(),
  client_password: z.string(),
  client_email: z.string()
})

type FormData = z.infer<typeof schema>

const onSubmit = (data: FormData) => {
  console.log(data)
}

export const AddClient: React.FC<ModalProps> = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      com_name: '',
      com_address: '',
      com_logo:  undefined,
      owner_name: '',
      owner_phone_no: '',
      owner_email: '',
      gm_sale_name: '',
      gm_sale_phone_no: '',
      gm_sale_email: '',
      client_username: '',
      client_password: '',
      client_email: ''
    }
  })

  return (
    <Dialog onClose={onClose} open={open} fullWidth>
      <DialogTitle>Add Client Information</DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)} className='px-4 w-full flex flex-col gap-3 '>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FormInput
              label='Enter Company Name...'
              register={register('com_name')}
              error={!!errors.com_name}
              helperText={errors.com_name?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <FileInput 
             register={register('com_logo')}
             error={!!errors.com_logo}
             helperText={errors.com_logo?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextArea
              label='Enter Company Address...'
              register={register('com_address')}
              error={!!errors.com_address}
              helperText={errors.com_address?.message}
            />
          </Grid>

          <Grid item xs={6}>
            <FormInput
              label='Enter Owner Name...'
              register={register('owner_name')}
              error={!!errors.owner_name}
              helperText={errors.owner_name?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <FormInput
              label='Enter Owner Phone No...'
              register={register('owner_phone_no')}
              error={!!errors.owner_phone_no}
              helperText={errors.owner_phone_no?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <FormInput
              label='Enter Owner Email...'
              register={register('owner_email')}
              error={!!errors.owner_email}
              helperText={errors.owner_email?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <FormInput
              label='Enter GM Sales Name...'
              register={register('gm_sale_name')}
              error={!!errors.gm_sale_name}
              helperText={errors.gm_sale_name?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <FormInput
              label='Enter GM Sales Phone No...'
              register={register('gm_sale_phone_no')}
              error={!!errors.gm_sale_phone_no}
              helperText={errors.gm_sale_phone_no?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <FormInput
              label='Enter GM Sales Email...'
              register={register('gm_sale_email')}
              error={!!errors.gm_sale_email}
              helperText={errors.gm_sale_email?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <FormInput
              label='Enter Client Username...'
              register={register('client_username')}
              error={!!errors.client_username}
              helperText={errors.client_username?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <FormInput
              label='Enter Client Password...'
              register={register('client_password')}
              error={!!errors.client_password}
              helperText={errors.client_password?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <FormInput
              label='Enter Client Email...'
              register={register('client_email')}
              error={!!errors.client_email}
              helperText={errors.client_email?.message}
            />
          </Grid>
        </Grid>

        <div className='py-4 flex justify-between items-center'> 
          <Button  variant='outlined' color='inherit' onClick={onClose}>
            Cancel
          </Button>
          <Button type='submit' variant='outlined' color='primary'>
            Submit
          </Button>
        </div>
      </form>
    </Dialog>
  )
}

