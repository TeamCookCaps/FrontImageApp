import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getImageName } from '../utils/imageUtils';

export default function GalleryCard({ galleryImages }) {
    const navigate = useNavigate();

    const handleNavigate = () =>
    navigate(`/gallery/${getImageName(galleryImages.image_url)}`, {
      state: { galleryImages },
    });

    return (
        <div className="relative h-60 w-60 md:w-72 md:h-72 lg:w-80 lg:h-80">
            <img className="w-full h-full object-cover"
            src = {galleryImages.image_url} 
            alt = {galleryImages.id} 
            onClick={handleNavigate}
            />
        </div>
    );
};