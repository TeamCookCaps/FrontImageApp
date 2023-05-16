import React from 'react';

export default function GalleryCard({ gallerycard }) {
    return (
        <div className="relative h-60 w-60 md:w-72 md:h-72 lg:w-80 lg:h-80">
            <img className="w-full h-full object-cover"
            src = {gallerycard.image_url} 
            alt = {gallerycard.image_id} 
            />
        </div>
    );
};