import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getImageinfo } from '../api/database';
import CategoryCard from './CategoryCard';

export default function Main({ user: { uid } }) {
  const {
    isLoading,
    error,
    data: photos,
  } = useQuery(['categories'], () => getImageinfo(uid)); // 임시. 나중에 categories로 바꿀 것

  return (
    <section className="flex flex-col gap-16 py-14 px-4">
      <secition className="mb-6">
        <header className="flex justify-between pb-5">
          <h2 className="text-3xl font-bold">좋아요 누른 사진</h2>
          <button className="border rounded-lg px-4 py-2 mr-11 font-normal text-xl hover:bg-yellow-300 hover:border-yellow-300">
            모두 보기
          </button>
        </header>
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {isLoading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {photos && photos.length > 5
            ? photos
                .slice(0, 5)
                .map((photo) => (
                  <CategoryCard
                    key={photo.id}
                    photo={photo}
                    isFavorite={true}
                  />
                ))
            : photos &&
              photos.map((photo) => (
                <CategoryCard key={photo.id} photo={photo} isFavorite={true} /> // 임시
              ))}
        </ul>
      </secition>
      <secition>
        <h2 className="pb-7 text-3xl font-bold">카테고리</h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {isLoading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {photos &&
            photos.map((photo) => (
              <CategoryCard
                key={photo.id}
                photo={photo}
                isFavorite={false}
                numOfPhotos={photos.length}
              /> // 임시
            ))}
        </ul>
      </secition>
    </section>
  );
}
