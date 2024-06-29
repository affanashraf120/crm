import React from 'react'

import ImageGallery from '../photos/imageGallery'
import { images } from '@/data/data'

const Pictures = () => {
  return <ImageGallery images={images} size='Medium Size' />
}

export default Pictures
