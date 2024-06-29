// Assuming this is in your data.ts or wherever you define your interfaces/types
interface Image {
  src: string
  alt: string
  date: string
  time: string
  uploadedBy: string
  selected: boolean
  name: string
}

// Your component using the Image interface
import React, { useState } from 'react'

import { Checkbox } from '@mui/material'

import { images } from '@/data/data'

const Pictures = () => {
  const [selectedImages, setSelectedImages] = useState<Image[]>([])

  // Function to toggle image selection
  const toggleImageSelection = (image: Image) => {
    const isSelected = selectedImages.some(selectedImage => selectedImage.src === image.src)

    if (isSelected) {
      // Deselect image
      setSelectedImages(selectedImages.filter(selectedImage => selectedImage.src !== image.src))
    } else {
      // Select image
      setSelectedImages([...selectedImages, image])
    }
  }

  // Render the component
  return (
    <div className='flex justify-start items-center flex-wrap gap-3'>
      {images.map((image: Image, index: number) => (
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
          <img className={`max-w-full rounded-lg cursor-pointer w-48 h-48`} src={image.src} alt={image.alt} />
          {/* Additional content or controls can be placed here */}
        </div>
      ))}
    </div>
  )
}

export default Pictures
