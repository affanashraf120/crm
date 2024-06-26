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

import FormGenerator from '@/components/formDrawer/form'
import ConfirmationDialog from '@/components/dialogs/confirmation-dialog'

const schema = z.object({
  com_name: z.string(),
  com_address: z.string(),
  com_logo: z.any(),
  owner_name: z.string(),
  owner_phone_no: z.string(),
  owner_email: z.string(),
  gm_sale_name: z.string(),
  gm_sale_phone_no: z.string(),
  gm_sale_email: z.string(),
  client_username: z.string(),
  client_password: z.string(),
  client_email: z.string(),
  link_crm_login: z.string(),
  crm_username: z.string(),
  crm_password: z.string(),
  crm_2_name: z.string(),
  link_crm_2_login: z.string(),
  crm_2_username: z.string(),
  crm_2_password: z.string(),
  appraisal_email_username: z.string(),
  appraisal_email_password: z.string(),
  appraisal_crm_username: z.string(),
  appraisal_crm_password: z.string()
})

type FormData = z.infer<typeof schema>

const AddClient = ({ onAction }: any) => {
  // States
  const [fileInput, setFileInput] = useState<string>('')
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')
  const [openClearModal, setOpenClearModal] = useState(false)

  const OnOpen = () => {
    setOpenClearModal(true)
  }

  const OnClose = () => {
    setOpenClearModal(false)
  }

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
      client_email: '',
      link_crm_login: '',
      crm_username: '',
      crm_password: '',
      crm_2_name: '',
      link_crm_2_login: '',
      crm_2_username: '',
      crm_2_password: '',
      appraisal_email_username: '',
      appraisal_email_password: '',
      appraisal_crm_username: '',
      appraisal_crm_password: ''
    }
  })

  const onSubmit = (data: FormData) => {
    onAction
    console.log('clicked', data)
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
        <IconButton onClick={onAction}>
          <i className='ri-arrow-right-s-line cursor-pointer rotate-180'></i>
        </IconButton>
      </div>
      <CardContent className='px-7'>
        <div className='flex items-center justify-center flex-col md:flex-row gap-6'>
          <img height={100} width={100} className='rounded' src={imgSrc} alt='Profile' />
          <div className='flex flex-grow flex-col gap-4'>
            <div className='flex flex-col items-center justify-center md:items-start md:justify-start sm:flex-row gap-4'>
              <Button component='label' size='small' variant='contained' htmlFor='account-settings-upload-image'>
                Upload Company Logo
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
        <form onSubmit={handleSubmit(onSubmit)} className='px-2 w-full flex flex-col gap-3'>
          <Grid container spacing={3}>
            {formFields.map((field, index) => (
              <Grid item xs={12} md={field.type === 'formTextArea' ? 12 : 6} key={index}>
                <FormGenerator field={field} register={register} errors={errors} fieldSize={field.fieldSize} />
              </Grid>
            ))}
          </Grid>
          <div className='flex justify-between items-center py-4'>
            <Button variant='outlined' color='inherit' onClick={OnOpen}>
              Clear
            </Button>
            <Button type='submit' variant='contained' color='primary'>
              Submit
            </Button>
          </div>

          <ConfirmationDialog
            open={openClearModal}
            setOpen={OnClose}
            type='clear'
            title='Are you sure you want to clear the form data?'
          />
        </form>
      </CardContent>
    </Card>
  )
}

export default AddClient

const formFields = [
  { type: 'formInput', name: 'com_name', label: 'Enter Company Name...', fieldSize: 'medium' },
  { type: 'formInput', name: 'owner_name', label: 'Enter Owner Name...', fieldSize: 'medium' },
  { type: 'formInput', name: 'owner_phone_no', label: 'Enter Owner Phone No...', fieldSize: 'medium' },
  { type: 'formInput', name: 'owner_email', label: 'Enter Owner Email...', fieldSize: 'medium' },
  { type: 'formInput', name: 'gm_sale_name', label: 'Enter GM/Sales Name...', fieldSize: 'medium' },
  { type: 'formInput', name: 'gm_sale_phone_no', label: 'Enter GM/Sales Phone No...', fieldSize: 'medium' },
  { type: 'formInput', name: 'gm_sale_email', label: 'Enter GM/Sales Email...', fieldSize: 'medium' },
  { type: 'formInput', name: 'client_username', label: 'Enter Client Username...', fieldSize: 'medium' },
  { type: 'formInput', name: 'client_email', label: 'Enter Client Email...', fieldSize: 'medium' },
  { type: 'formInput', name: 'client_password', label: 'Enter Client Password...', fieldSize: 'medium' },
  { type: 'formInput', name: 'link_crm_login', label: 'Enter Link to CRM Login Page...', fieldSize: 'medium' },
  { type: 'formInput', name: 'crm_username', label: 'Enter CRM Username...', fieldSize: 'medium' },
  { type: 'formInput', name: 'crm_password', label: 'Enter CRM Password...', fieldSize: 'medium' },
  { type: 'formInput', name: 'crm_2_name', label: 'Enter CRM 2 Name...', fieldSize: 'medium' },
  { type: 'formInput', name: 'link_crm_2_login', label: 'Enter Link to CRM 2 Login Page...', fieldSize: 'medium' },
  { type: 'formInput', name: 'crm_2_username', label: 'Enter CRM 2 Username...', fieldSize: 'medium' },
  { type: 'formInput', name: 'crm_2_password', label: 'Enter CRM 2 Password...', fieldSize: 'medium' },
  {
    type: 'formInput',
    name: 'appraisal_email_username',
    label: 'Enter Client Email User Name...',
    fieldSize: 'medium'
  },
  {
    type: 'formInput',
    name: 'appraisal_email_password',
    label: 'Enter Client Email User Password...',
    fieldSize: 'medium'
  },
  { type: 'formInput', name: 'appraisal_crm_username', label: 'Enter Client CRM User Name...', fieldSize: 'medium' },
  {
    type: 'formInput',
    name: 'appraisal_crm_password',
    label: 'Enter Client CRM User Password...',
    fieldSize: 'medium'
  },
  { type: 'formTextArea', name: 'com_address', label: 'Enter Company Address...' }
]
