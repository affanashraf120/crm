import React, { useEffect, useRef, useState } from 'react'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Checkbox, IconButton, TextField } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'

import FormDialog from '@/components/dialogBox/formDialog'
import DropDownButton from '@/components/dropDowns/dropDownButton'
import PhotoFeature from './photoFeature'

interface Image {
  src: string
  alt: string
  date: string
  selected: boolean
  time: string
  uploadedBy: string
  name: string
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
  const [isHovered, setIsHovered] = useState(false)
  const [editStates, setEditStates] = useState<{ [key: string]: boolean }>({})
  const [editLabels, setEditLabels] = useState<{ [key: string]: string }>({})
  const [fullScreenImage, setFullScreenImage] = useState<Image | null>(null)
  const [listView, setListView] = useState(false)
  const [open, setOpen] = useState(false)

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

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

  useEffect(() => {
    Object.keys(groupedImages).forEach((date, index) => {
      if (editStates[date] && inputRefs.current[index]) {
        inputRefs.current[index]?.focus()
      }
    })
  }, [editStates])

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

  const handleEditClick = (date: string) => {
    setEditStates({ ...editStates, [date]: true })
    setEditLabels({ ...editLabels, [date]: date })
  }

  const handleSaveClick = (date: string) => {
    setEditStates({ ...editStates, [date]: false })
  }

  const handleInputChange = (date: string, event: any) => {
    setEditLabels({ ...editLabels, [date]: event.target.value })
  }

  const openFullScreen = (image: Image) => {
    setFullScreenImage(image)
    setOpen(true)
  }

  return (
    <div className='w-full'>
      <div className='flex justify-start items-center gap-2 flex-wrap pb-2'>
        <div>
          <Checkbox checked={selectAll} onChange={toggleSelectAll} />
          <label>{selectAll ? 'Deselect All' : 'Select All'}</label>
        </div>
        <div>
          <Checkbox checked={listView} onChange={() => setListView(!listView)} />
          <label>List View</label>
        </div>
        <div>
          <Checkbox checked={details} onChange={() => setDetails(!details)} />
          <label>{details ? 'Details' : 'Details'}</label>
        </div>
        {selectedImages.length > 0 && (
          <DropDownButton
            label='Action '
            menuOptions={[
              { label: 'Move to Another Album', icon: 'ri-arrow-go-back-fill w-4 h-4' },
              { label: 'Copy to Another Album', icon: 'ri-file-copy-line  w-4 h-4' },
              { label: 'Share', icon: 'ri-share-line  w-4 h-4' },
              { label: 'Download', icon: 'ri-download-cloud-2-line w-4 h-4' },
              { label: 'Delete', icon: 'ri-delete-bin-6-line w-4 h-4' },
              { label: 'Print / Create Pdf', icon: 'ri-printer-line w-4 h-4' }
            ]}
            onMenuItemClick={item => console.log(item)}
          />
        )}
      </div>
      <div className='h-[500px] overflow-y-auto xl:h-full'>
        {Object.keys(groupedImages).map((date: any) => (
          <Accordion
            key={date}
            sx={{
              '&:before': {
                display: 'none'
              }
            }}
            onChange={(e, expanded) => {
              if (expanded) {
                setIsHovered(true)
              } else if (!expanded) {
                setIsHovered(false)
              }
            }}
            className={` mb-2 duration-500 transition-all ease-in-out border rounded ${
              !isHovered && 'hover:bg-[#f5f5f5]/10'
            }`}
          >
            <div className='flex justify-start items-start md:items-center flex-col md:flex-row '>
              <div className='flex justify-start items-center group w-full px-7'>
                <Checkbox
                  checked={accordionSelectStatus[date] || false}
                  onChange={() => toggleAccordionSelection(date)}
                />
                <div className='w-full pl-0'>
                  <AccordionSummary
                    sx={{ p: 1 }}
                    expandIcon={
                      <IconButton>
                        <ExpandMoreIcon />
                      </IconButton>
                    }
                  >
                    {editStates[date] ? (
                      <TextField
                        variant='standard'
                        InputProps={{
                          disableUnderline: true
                        }}
                        sx={{ marginTop: 2 }}
                        value={editLabels[date]}
                        onChange={event => handleInputChange(date, event)}
                        inputRef={ref => (inputRefs.current[date] = ref)}
                      />
                    ) : (
                      <span className='mt-2'>{editLabels[date] || date}</span>
                    )}
                    <IconButton
                      onClick={event => {
                        event.stopPropagation()
                        editStates[date] ? handleSaveClick(date) : handleEditClick(date)
                      }}
                    >
                      <i className='ri-edit-2-line w-4 h-4'></i>
                    </IconButton>{' '}
                    <span className='mt-2'>({groupedImages[date].length})</span>
                  </AccordionSummary>
                </div>
              </div>
            </div>
            <AccordionDetails>
              {listView ? (
                <>
                  <div className='hidden md:flex justify-between items-center flex-wrap gap-2 text-secondary'>
                    <div className='flex justify-between items-center w-full border-b mb-3'>
                      <div className='relative flex  justify-center items-center gap-2 pl-10 py-1'>Name</div>
                      <div className={`flex justify-between items-center`}>
                        <>
                          <span className='w-32'>Uploade dBy</span>
                          <span className='w-32'>Time</span>
                          <span className='w-32'>Action</span>
                        </>
                      </div>
                    </div>
                  </div>

                  <div className='flex justify-between items-center flex-wrap gap-2'>
                    {groupedImages[date].map((image, index) => (
                      <div
                        key={index}
                        className='flex flex-col justify-start items-start md:flex-row md:justify-between md:items-center w-full border rounded hover:bg-white/10 duration-500 ease-in-out transition-all mb-2'
                      >
                        <div className='relative flex  justify-center items-center gap-2 p-1'>
                          <Checkbox
                            color='primary'
                            checked={selectedImages.some(selectedImage => selectedImage.src === image.src)}
                            onChange={() => toggleImageSelection(image)}
                          />
                          <img
                            className={` h-10 w-10 rounded-full cursor-pointer`}
                            src={image.src}
                            alt={image.alt}
                            onClick={() => openFullScreen(image)}
                          />
                          {image.name}
                        </div>
                        <div
                          className={`flex justify-start items-start gap-1 p-3 flex-col md:flex-row md:justify-center md:items-center w-full`}
                        >
                          {details && (
                            <div className='flex justify-start md:justify-end items-start w-full'>
                              <div className='flex justify-between items-center flex-col md:flex-row'>
                                <span className='w-32'>{image.uploadedBy}</span>
                                <span className='w-32'>{image.time}</span>
                              </div>
                              <span className='w-32 '>
                                <DropDownButton
                                  onMenuItemClick={item => console.log(item)}
                                  buttonLabel='ri-more-2-fill rotate-180 w-4 h-4 cursor-pointer'
                                  menuOptions={[
                                    { label: 'Move to Another Album', icon: 'ri-arrow-go-back-fill w-4 h-4' },
                                    { label: 'Copy to Another Album', icon: 'ri-file-copy-line w-4 h-4' },
                                    { label: 'Share', icon: 'ri-share-line w-4 h-4' },
                                    { label: 'Download', icon: 'ri-download-cloud-2-line w-4 h-4' },
                                    { label: 'Delete', icon: 'ri-delete-bin-6-line w-4 h-4' },
                                    { label: 'Print / Create Pdf', icon: 'ri-printer-line w-4 h-4' }
                                  ]}
                                />
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className='flex justify-start items-center flex-wrap gap-3'>
                  {groupedImages[date].map((image, index) => (
                    <div key={index} className='relative flex flex-col'>
                      <Checkbox
                        className='absolute top-2 left-2'
                        sx={{
                          '&:not(.Mui-checked) .MuiSvgIcon-root': {
                            borderColor: 'blue',
                            borderWidth: 1,
                            borderStyle: 'solid',
                            borderRadius: 4
                          }
                        }}
                        checked={selectedImages.some(selectedImage => selectedImage.src === image.src)}
                        onChange={() => toggleImageSelection(image)}
                      />
                      <img
                        className={`h-auto max-w-full rounded-lg cursor-pointer ${sizeClass[size || 'Medium']}`}
                        src={image.src}
                        alt={image.alt}
                        onClick={() => openFullScreen(image)}
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
                              menuOptions={[
                                { label: 'Move to Another Album', icon: 'ri-arrow-go-back-fill w-4 h-4' },
                                { label: 'Copy to Another Album', icon: 'ri-file-copy-line w-4 h-4' },
                                { label: 'Share', icon: 'ri-share-line w-4 h-4' },
                                { label: 'Download', icon: 'ri-download-cloud-2-line w-4 h-4' },
                                { label: 'Delete', icon: 'ri-delete-bin-6-line w-4 h-4' },
                                { label: 'Print / Create Pdf', icon: 'ri-printer-line w-4 h-4' }
                              ]}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
      {fullScreenImage && (
        <FormDialog
          open={open}
          onClose={() => setOpen(!open)}
          dialogTitle={fullScreenImage.alt}
          closeButton={true}
          dialogSize='70%'
        >
          <PhotoFeature photo={fullScreenImage} allImages={images} />
        </FormDialog>
      )}{' '}
    </div>
  )
}

export default ImageGallery
