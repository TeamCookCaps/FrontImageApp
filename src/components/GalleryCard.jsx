import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getImageName } from '../utils/imageUtils';

export default function GalleryCard({ galleryImage }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/gallery/${getImageName(galleryImage.image_url)}`, {
      state: { galleryImage },
    });
  };

  return (
    <div className="relative h-60 w-60 md:w-72 md:h-72 lg:w-80 lg:h-80">
      <img
        className="w-full h-full object-cover"
        src={galleryImage.image_url}
        alt={galleryImage.id}
        onClick={handleNavigate}
      />
    </div>
  );
}
