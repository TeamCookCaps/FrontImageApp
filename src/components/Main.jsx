import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getImageinfo } from '../api/database';
import CategoryCard from './CategoryCard';

// 임시 데이터
const categories = [
  {
    categoryId: 1,
    href: '#',
    categoryName: 'category1',
    numOfPictures: '103',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-01.jpg',
    imageAlt: 'ex1',
  },
  {
    categoryId: 2,
    href: '#',
    categoryName: 'category2',
    numOfPictures: '91',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-02.jpg',
    imageAlt: 'ex2',
  },
  {
    categoryId: 3,
    href: '#',
    categoryName: 'category3',
    numOfPictures: '84',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-03.jpg',
    imageAlt: 'ex3',
  },
  {
    categoryId: 4,
    href: '#',
    categoryName: 'category4',
    numOfPictures: '22',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-04.jpg',
    imageAlt: 'ex4',
  },
  {
    categoryId: 5,
    href: '#',
    categoryName: 'category5',
    numOfPictures: '23',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-05.jpg',
    imageAlt: 'ex5',
  },
  {
    categoryId: 6,
    href: '#',
    categoryName: 'category6',
    numOfPictures: '24',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-06.jpg',
    imageAlt: 'ex6',
  },
];

export default function Main() {
  const [categoryCount, setCategoryCount] = useState(categories.length);
  const {
    isLoading,
    error,
    data: photos,
  } = useQuery(['categories'], getImageinfo); // 임시. 나중에 categories로 바꿀 것

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <section className="flex flex-col gap-16 py-14 px-4">
        <secition className="mb-6">
          <header className="flex justify-between pb-5">
            <h2 className="text-3xl font-bold">좋아요 누른 사진</h2>
            <button className="border rounded-lg px-4 py-2 mr-11 font-normal text-xl hover:bg-yellow-300 hover:border-yellow-300">
              모두 보기
            </button>
          </header>
          <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {/* {categories && categoryCount > 5
              ? categories
                  .slice(0, 5)
                  .map((category) => (
                    <CategoryCard
                      key={category.categoryId}
                      category={category}
                    />
                  ))
              : categories.map((category) => (
                  <CategoryCard key={category.categoryId} category={category} />
                ))} */}
          </ul>
        </secition>
        <secition>
          <h2 className="pb-7 text-3xl font-bold">카테고리</h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {/* {categories &&
              categories.map((category) => (
                <CategoryCard
                  key={category.categoryId}
                  category={category}
                  numOfPictures={category.numOfPictures}
                />
              ))} */}
            {photos &&
              photos.map((photo) => (
                <CategoryCard key={photo.id} photo={photo} /> // 임시
              ))}
          </ul>
        </secition>
      </section>
    </>
  );
}
