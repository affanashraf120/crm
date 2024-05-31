import React from 'react'

interface Image {
  src: string
  alt: string
  date: string
}

interface ImageGalleryProps {
  images: Image[]
  size?: 'small' | 'medium' | 'large'
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, size  }) => {
  const groupedImages = images.reduce(
    (acc, image) => {
      acc[image.date] = acc[image.date] || []
      acc[image.date].push(image)

      return acc
    },
    {} as { [key: string]: Image[] }
  )

  const sizeClass = {
    small: 'w-24 h-24',
    medium: 'w-48 h-48',
    large: 'w-72 h-72'
  }

  return (
    <div className='w-full'>
      {Object.keys(groupedImages).map(date => (
        <div key={date} className='mb-8'>
          <h2 className='text-lg font-semibold mb-4'>{date}</h2>
          <div className='flex justify-start items-center flex-wrap gap-3'>
            {groupedImages[date].map((image, index) => (
              <div key={index}>
                <img className={`h-auto max-w-full rounded-lg ${sizeClass[size || 'medium']}`} src={image.src} alt={image.alt} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ImageGallery
