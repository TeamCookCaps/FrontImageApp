import React from 'react';
import { useLocation } from 'react-router-dom';
import PhotoCard from '../components/PhotoCard';
import Masonry from 'react-masonry-css';

export default function AllPhoto() {
  const {
    state: { photos },
  } = useLocation();

  return (
    <>
      <h2 className="text-4xl font-bold p-4">{photos[0].category_name}</h2>
      <Masonry
        className="flex animate-slide-fwd"
        breakpointCols={{
          default: 4,
          1100: 3,
          700: 2,
          500: 1,
        }}
      >
        {photos &&
          photos.map((photo) => {
            const deleted =
              localStorage.getItem(`photo-deleted-${photo.image_id}`) ||
              photo.deleted_yn;
            return deleted === 'y' ? null : (
              <PhotoCard
                key={photo.image_id}
                photo={photo}
                photos={photos}
                deleted={deleted}
              />
            );
          })}
      </Masonry>
    </>
  );
}
