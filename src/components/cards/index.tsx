'use client'

import { useEffect, useState } from 'react'

import EditIcon from '@mui/icons-material/Edit'

import { Card, CardContent, Chip, Divider, IconButton, Typography } from '@mui/material'

const ContactCard = ({ card, title }: any) => {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  if (!hydrated) {
    // Avoid rendering anything until the component is hydrated
    return null
  }

  return (
    <Card className='w-full mx-auto shadow-lg '>
      <CardContent>
        {title && (
          <div className='flex justify-between items-center'>
            <Typography variant='h6' component='div'>
              {title}
            </Typography>
            <IconButton size='small' className='ml-2'>
              <EditIcon fontSize='small' />
            </IconButton>
          </div>
        )}

        <Divider className='my-4' />
        <div className='space-y-3'>
          {card?.map((detail: any, index: any) => (
            <div key={index} className='flex items-center'>
              <i className={`${detail.icon} mr-2 w-4 h-4`}></i>
              <Typography variant='body1'>
                <strong>{detail.label}:</strong>{' '}
                {detail.isEmail ? (
                  <a href={`mailto:${detail.value}`} className='text-blue-500'>
                    {detail.value}
                  </a>
                ) : detail.status ? (
                  <Chip label={detail.value} color='primary' />
                ) : (
                  <>{detail.value}</>
                )}
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ContactCard
