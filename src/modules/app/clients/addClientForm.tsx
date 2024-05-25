'use client'

// React Imports
import { useState } from 'react'
import type { ChangeEvent } from 'react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { IconButton } from '@mui/material'

import { FormInput } from '@/components/formComponents/formInput'
import { FormTextArea } from '@/components/formComponents/formTextArea'

const schema = z.object({
  com_name: z.string(),
  com_address: z.string(),
  com_logo: z.any().refine(file => file instanceof File, 'You must select a file.'),
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


const AddClient = ({handleAction}:any) => {
  // States
  const [fileInput, setFileInput] = useState<string>('')
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      com_name: '',
      com_address: '',
      com_logo: undefined,
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

  const onSubmit = (data: FormData) => {
    handleAction
    console.log("clicked",data)
  }

  const handleFileInputChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement

    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)
      reader.readAsDataURL(files[0])

      if (reader.result !== null) {
        setFileInput(reader.result as string)
      }
    }
  }

  const handleFileInputReset = () => {
    setFileInput('')
    setImgSrc('/images/avatars/1.png')
  }

  return (
    <Card>
      <div className='px-4 pt-4'>
        <IconButton onClick={handleAction}>
          <i className='ri-arrow-right-s-line cursor-pointer rotate-180'></i>
        </IconButton>
      </div>
      <CardContent className='mbe-1'>
        <div className='flex items-start sm:items-center gap-6'>
          <img height={100} width={100} className='rounded' src={imgSrc} alt='Profile' />
          <div className='flex flex-grow flex-col gap-4'>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Button component='label' size='small' variant='contained' htmlFor='account-settings-upload-image'>
                Upload New Photo
                <input
                  hidden
                  type='file'
                  value={fileInput}
                  accept='image/png, image/jpeg'
                  onChange={handleFileInputChange}
                  id='account-settings-upload-image'
                />
              </Button>
              <Button size='small' variant='outlined' color='error' onClick={handleFileInputReset}>
                Reset
              </Button>
            </div>
            <Typography>Allowed JPG, GIF or PNG. Max size of 800K</Typography>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className=' w-full flex flex-col gap-3 '>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <FormInput
                label='Enter Company Name...'
                register={register('com_name')}
                error={!!errors.com_name}
                helperText={errors.com_name?.message}
                fieldSize='medium'
              />
            </Grid>

            <Grid item xs={6}>
              <FormInput
                label='Enter Owner Name...'
                register={register('owner_name')}
                error={!!errors.owner_name}
                helperText={errors.owner_name?.message}
                fieldSize='medium'

              />
            </Grid>
            <Grid item xs={6}>
              <FormInput
                label='Enter Owner Phone No...'
                register={register('owner_phone_no')}
                error={!!errors.owner_phone_no}
                helperText={errors.owner_phone_no?.message}
                fieldSize='medium'

              />
            </Grid>
            <Grid item xs={6}>
              <FormInput
                label='Enter Owner Email...'
                register={register('owner_email')}
                error={!!errors.owner_email}
                helperText={errors.owner_email?.message}
                fieldSize='medium'

              />
            </Grid>
            <Grid item xs={6}>
              <FormInput
                label='Enter GM Sales Name...'
                register={register('gm_sale_name')}
                error={!!errors.gm_sale_name}
                helperText={errors.gm_sale_name?.message}
                fieldSize='medium'

              />
            </Grid>
            <Grid item xs={6}>
              <FormInput
                label='Enter GM Sales Phone No...'
                register={register('gm_sale_phone_no')}
                error={!!errors.gm_sale_phone_no}
                helperText={errors.gm_sale_phone_no?.message}
                fieldSize='medium'

              />
            </Grid>
            <Grid item xs={6}>
              <FormInput
                label='Enter GM Sales Email...'
                register={register('gm_sale_email')}
                error={!!errors.gm_sale_email}
                helperText={errors.gm_sale_email?.message}
                fieldSize='medium'

              />
            </Grid>
            <Grid item xs={6}>
              <FormInput
                label='Enter Client Username...'
                register={register('client_username')}
                error={!!errors.client_username}
                helperText={errors.client_username?.message}
                fieldSize='medium'

              />
            </Grid>
            <Grid item xs={6}>
              <FormInput
                label='Enter Client Email...'
                register={register('client_email')}
                error={!!errors.client_email}
                helperText={errors.client_email?.message}
                fieldSize='medium'

              />
            </Grid>
            <Grid item xs={6}>
              <FormInput
                label='Enter Client Password...'
                register={register('client_password')}
                error={!!errors.client_password}
                helperText={errors.client_password?.message}
                fieldSize='medium'

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
          </Grid>

          <div className='py-4 flex justify-between items-center'>
            <Button variant='outlined' color='inherit' onClick={() => {}}>
              Cancel
            </Button>
            <Button type='submit' variant='contained' color='primary'>
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default AddClient
