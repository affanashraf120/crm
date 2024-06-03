import React, { useState } from 'react';

import { Checkbox } from '@mui/material';

interface Image {
  src: string;
  alt: string;
  date: string;
  selected: boolean;
}

interface ImageGalleryProps {
  images: Image[];
  size?: 'small' | 'medium' | 'large';
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, size }) => {
  const [selectedImages, setSelectedImages] = useState<Image[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const groupedImages = images.reduce(
    (acc, image) => {
      acc[image.date] = acc[image.date] || [];
      acc[image.date].push(image);

      return acc;

    },
    {} as { [key: string]: Image[] }
  );

  const sizeClass = {
    small: 'w-24 h-24',
    medium: 'w-48 h-48',
    large: 'w-72 h-72'
  };

  const toggleImageSelection = (image: Image) => {
    const isSelected = selectedImages.some(selectedImage => selectedImage.src === image.src);

    if (isSelected) {
      setSelectedImages(selectedImages.filter(selectedImage => selectedImage.src !== image.src));
    } else {
      setSelectedImages([...selectedImages, image]);
    }
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedImages([]);
    } else {
      const allImages = Object.values(groupedImages).flat();

      setSelectedImages(allImages);
    }

    setSelectAll(!selectAll);
  };

  return (
    <div className='w-full'>
       <div>
        <Checkbox
          checked={selectAll}
          onChange={toggleSelectAll}
        />
        <label>Select All</label>
      </div>
      {Object.keys(groupedImages).map(date => (
        <div key={date} className='mb-8'>
          <h2 className='text-lg font-semibold mb-4'>{date}</h2>
          <div className='flex justify-start items-center flex-wrap gap-3'>
            {groupedImages[date].map((image, index) => (
              <div key={index} className="relative">
                <Checkbox
                  className="absolute top-2 left-2"
                  checked={selectedImages.some(selectedImage => selectedImage.src === image.src)}
                  onChange={() => toggleImageSelection(image)}
                />
                <img
                  className={`h-auto max-w-full rounded-lg cursor-pointer ${sizeClass[size || 'medium']}`}
                  src={image.src}
                  alt={image.alt}
                  onClick={() => toggleImageSelection(image)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
