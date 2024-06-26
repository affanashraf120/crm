import React, { useState } from 'react'

import { Avatar, Button, TextField } from '@mui/material'

import MultiSelectDropdown from '@/components/dropDowns/multifiltercheckbox'
import { tags, topic, visibility } from '@/data/data'

const PhotoFeature = ({ photo, allImages }: any) => {
  console.log('🚀 ~ PhotoFeature ~ photo:', photo)
  const [isReply, setIsReply] = useState(false)

  return (
    <div className='grid grid-cols-4 gap-2'>
      <div className='col-span-4 md:col-span-3'>
        <img src={photo.src} alt={photo.alt} className='h-[600px] xl:max-h-full w-full rounded' />
      </div>
      <div className='col-span-4 h-auto md:col-span-1 md:overflow-y-auto md:h-[600px] py-1 flex flex-col gap-2'>
        <TextField size='small' label='Photo Name' value={photo.alt} />
        <TextField size='small' label='Description' value='' multiline minRows={3} />
        <MultiSelectDropdown
          onselect={(item: any) => console.log(item)}
          title='Tags'
          name='Tags'
          type='accordion-sort'
          options={[
            { label: 'After', active: false },
            { label: 'Before', active: false }
          ]}
        />
        <MultiSelectDropdown
          onselect={(item: any) => console.log(item)}
          title='Album'
          name='Tags'
          type='accordion-checkbox'
          options={[
            { label: 'Adjuster Album', active: false },
            { label: 'Job Paperwork', active: false },
            { label: 'Roof Report', active: false }
          ]}
        />

        <div className='flex justify-start items-center gap-2 flex-wrap  border p-2 w-full rounded'>
          <TextField
            minRows={2}
            multiline
            fullWidth
            placeholder='Create a New Comment...'
            onChange={(event: any) => console.log(event.target.value)}
            value=''
          />

          <div className='flex justify-between items-center gap-2 flex-wrap w-full'>
            <div className='flex justify-between items-center gap-1 flex-wrap'>
              <MultiSelectDropdown
                icon='ri-price-tag-3-line  w-5 h-5 cursor-pointer'
                onselect={e => console.log(e)}
                type='button-filter-dropdown'
                toolTip='Notify'
                options={tags}
                name='Tags'
              />
              <MultiSelectDropdown
                icon='ri-lightbulb-line w-5 h-5 cursor-pointer'
                onselect={e => console.log(e)}
                type='button-filter-dropdown'
                toolTip='Topic'
                options={topic}
                name='Topic'
              />

              <MultiSelectDropdown
                icon='ri-organization-chart w-5 h-5 cursor-pointer'
                onselect={e => console.log(e)}
                type='button-filter-dropdown'
                toolTip='Viewable'
                options={visibility}
                name='Visibility'
              />
            </div>
            <Button variant='contained' size='small'>
              Post
            </Button>
          </div>
        </div>

        <div className='flex items-start justify-start gap-2 flex-wrap md:flex-nowrap'>
          <Avatar src='/images/avatars/1.png' />
          <div className='flex md:flex-col gap-6 flex-wrap'>
            <PhotoSection images={allImages} />
          </div>
        </div>
        {!isReply && (
          <div className='flex justify-end items-center w-full'>
            <Button variant='outlined' onClick={() => setIsReply(!isReply)}>
              Reply
            </Button>
          </div>
        )}

        {/* Reply Component */}
        {isReply && (
          <div className='flex justify-start items-center gap-2 flex-wrap w-full rounded'>
            <div className='flex justify-start items-start gap-2 w-full'>
              <Avatar src='/images/avatars/1.png' />
              <TextField minRows={2} multiline fullWidth placeholder='Reply the Comment...' />
            </div>

            <div className='flex justify-between items-center gap-2 flex-wrap w-full'>
              <div className='flex justify-between items-center gap-2 flex-wrap md:ml-10'>
                <MultiSelectDropdown
                  icon='ri-price-tag-3-line  w-5 h-5 cursor-pointer'
                  onselect={e => console.log(e)}
                  type='button-filter-dropdown'
                  toolTip='Notify'
                  name='tags'
                  options={tags}
                />
              </div>
              <div className='flex justify-end gap-2'>
                <Button variant='outlined' onClick={() => {}}>
                  Cancel
                </Button>
                <Button variant='contained' size='small'>
                  Reply
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PhotoFeature

const PhotoSection = (images: any) => {
  console.log('🚀 ~ PhotoSection ~ images:', images)

  return (
    <>
      <div className='ml-0 md:ml-2'>
        <div className='flex justify-start items-center gap-0.5 flex-wrap w-full'>
          <h6 className='text-base'>Robin Southern</h6>
          <i className='ri-chat-1-line w-5 h-5'></i>
          <p className='text-xs'>4/1/24 8:44 PM</p>
        </div>
        <span className='text-primary text-sm'>
          <strong className='text-secondary'>To:</strong> Luke Sublette, Rosa Hernandez
        </span>

        <div className='flex justify-start items-center flex-wrap gap-2 py-2'>
          {images.images.map((item: any, index: any) => (
            <img key={index} src={item.src} alt={item.alt} className='h-16 w-16 rounded' />
          ))}
        </div>
      </div>
    </>
  )
}
