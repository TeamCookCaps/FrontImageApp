import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getImageinfo } from '../api/database';
import CategoryCard from './CategoryCard';
import LikeCategoryCard from './LikeCategoryCard';

export default function Main({ user: { uid } }) {
  const {
    isLoading,
    error,
    data: photos,
  } = useQuery(['photos'], () => getImageinfo(uid));

  // 카테고리별로 그룹핑
  const categoryMap = new Map();
  if (photos) {
    photos.forEach((photo) => {
      const { category_name } = photo;
      if (categoryMap.has(category_name)) {
        categoryMap.get(category_name).push(photo);
      } else {
        categoryMap.set(category_name, [photo]);
      }
    });
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="flex flex-col gap-16 py-14 px-4">
      <section className="mb-6">
        <header className="flex justify-between pb-5">
          <h2 className="text-3xl font-bold">좋아요 누른 사진</h2>
          <button className="border rounded-lg px-4 py-2 mr-11 font-normal text-xl hover:bg-yellow-300 hover:border-yellow-300">
            모두 보기
          </button>
        </header>
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {photos &&
            photos.slice(0, 5).map((photo) => (
              <LikeCategoryCard key={photo.id} photo={photo} /> // 아직 수정필요 (임시)
            ))}
        </ul>
      </section>
      <section>
        <h2 className="pb-7 text-3xl font-bold">카테고리</h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {categoryMap &&
            Array.from(categoryMap, ([categoryName, photos]) => (
              <CategoryCard
                key={categoryName}
                categoryName={categoryName}
                photos={photos}
                numOfPhotos={photos.length}
              />
            ))}
        </ul>
      </section>
    </section>
  );
}
