import React from 'react';
import { useLocation } from 'react-router-dom';
import PhotoCard from '../components/PhotoCard';

export default function AllPhoto() {
  const {
    state: { photos },
  } = useLocation();

  return (
    <>
      <h2 className="text-4xl font-bold p-4">{photos[0].category_name}</h2>
      <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
        {photos &&
          photos.map((photo) => (
            <PhotoCard key={photo.image_id} photo={photo} />
          ))}
      </ul>
    </>
  );
}
