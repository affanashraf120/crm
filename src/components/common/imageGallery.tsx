import React, { useState } from 'react'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Checkbox, IconButton, TextField } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'

import DropDownButton from '../dropDowns/dropDownButton'

interface Image {
  src: string
  alt: string
  date: string
  selected: boolean
  time: string
  uploadedBy: string
}

interface ImageGalleryProps {
  images: Image[]
  size?: 'Small' | 'Medium' | 'Large'
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, size }) => {
  const [selectedImages, setSelectedImages] = useState<Image[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const [details, setDetails] = useState(false)
  const [accordionSelectStatus, setAccordionSelectStatus] = useState<{ [key: string]: boolean }>({})

  const groupedImages = images.reduce(
    (acc, image) => {
      acc[image.date] = acc[image.date] || []
      acc[image.date].push(image)

      return acc
    },
    {} as { [key: string]: Image[] }
  )

  const sizeClass = {
    Small: 'w-24 h-24',
    Medium: 'w-48 h-48',
    Large: 'w-72 h-72'
  }

  const toggleImageSelection = (image: Image) => {
    const isSelected = selectedImages.some(selectedImage => selectedImage.src === image.src)

    if (isSelected) {
      setSelectedImages(selectedImages.filter(selectedImage => selectedImage.src !== image.src))
    } else {
      setSelectedImages([...selectedImages, image])
    }
  }

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedImages([])
      setAccordionSelectStatus({})
    } else {
      const allImages = Object.values(groupedImages).flat()

      setSelectedImages(allImages)

      const newAccordionSelectStatus = Object.keys(groupedImages).reduce(
        (acc, date) => {
          acc[date] = true

          return acc
        },
        {} as { [key: string]: boolean }
      )

      setAccordionSelectStatus(newAccordionSelectStatus)
    }

    setSelectAll(!selectAll)
  }

  const toggleAccordionSelection = (date: string) => {
    const isAllSelected = accordionSelectStatus[date] || false

    if (isAllSelected) {
      const newSelectedImages = selectedImages.filter(image => image.date !== date)

      setSelectedImages(newSelectedImages)
    } else {
      const newSelectedImages = [...selectedImages, ...groupedImages[date]]

      setSelectedImages(newSelectedImages)
    }

    setAccordionSelectStatus({ ...accordionSelectStatus, [date]: !isAllSelected })
  }

  return (
    <div className='w-full'>
      <div className='flex justify-start items-center gap-2 flex-wrap pb-2'>
        <div>
          <Checkbox checked={selectAll} onChange={toggleSelectAll} />
          <label>{selectAll ? 'Deselect All' : 'Select All'}</label>
        </div>
        <div>
          <Checkbox checked={details} onChange={() => setDetails(!details)} />
          <label>{details ? 'Details' : 'Details'}</label>
        </div>
        {selectedImages.length > 0 && (
          <DropDownButton
            label='Action '
            menuOptions={[
              { label: 'Move to Another Album', icon: 'ri-arrow-go-back-fill' },
              { label: 'Copy to Another Album', icon: 'ri-file-copy-line' },
              { label: 'Share', icon: 'ri-share-line' },
              { label: 'Download', icon: 'ri-download-cloud-2-line' },
              { label: 'Delete', icon: 'ri-delete-bin-6-line' }
            ]}
            onMenuItemClick={item => console.log(item)}
          />
        )}
      </div>

      <div className='h-[500px] overflow-y-auto'>
        {Object.keys(groupedImages).map(date => (
          <Accordion key={date}>
            <div className='flex justify-start items-start md:items-center flex-col md:flex-row '>
              <div className='flex justify-start items-center group'>
                <Checkbox
                  checked={accordionSelectStatus[date] || false}
                  onChange={() => toggleAccordionSelection(date)}
                />
                <TextField placeholder='Untitled' variant='standard' sx={{ marginTop: 0 }} />
                <IconButton className=''>
                  <i className='ri-edit-2-line w-4 h-4'></i>
                </IconButton>
              </div>

              <div className='w-full '>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>{date}</AccordionSummary>
              </div>
            </div>
            <AccordionDetails>
              <div className='flex justify-start items-center flex-wrap gap-3'>
                {groupedImages[date].map((image, index) => (
                  <div key={index} className='relative flex flex-col'>
                    <Checkbox
                      className='absolute top-2 left-2'
                      color='primary'
                      checked={selectedImages.some(selectedImage => selectedImage.src === image.src)}
                      onChange={() => toggleImageSelection(image)}
                    />
                    <img
                      className={`h-auto max-w-full rounded-lg cursor-pointer ${sizeClass[size || 'Medium']}`}
                      src={image.src}
                      alt={image.alt}
                      onClick={() => toggleImageSelection(image)}
                    />
                    <div className={`flex justify-between items-center`}>
                      {details && (
                        <>
                          <div className='flex justify-start items-start flex-col'>
                            <span>{image.uploadedBy}</span>
                            <span className='text-[10px]'>{image.time}</span>
                          </div>

                          <DropDownButton
                            onMenuItemClick={item => console.log(item)}
                            buttonLabel='ri-more-2-fill rotate-180 w-4 h-4 cursor-pointer'
                            menuOptions={[{ label: 'Delete' }, { label: 'unlink' }]}
                          />
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  )
}

export default ImageGallery
