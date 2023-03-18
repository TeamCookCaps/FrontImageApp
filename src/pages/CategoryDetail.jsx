import React from 'react';

// 임시 데이터
const categories = [
  {
    categoryId: 1,
    href: '#',
    categoryName: 'category1',
    numOfPictures: '103',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-01.jpg',
    imageAlt: "ex1",
  },
  {
    categoryId: 2,
    href: '#',
    categoryName: 'category2',
    numOfPictures: '91',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-02.jpg',
    imageAlt: "ex2",
  },
  {
    categoryId: 3,
    href: '#',
    categoryName: 'category3',
    numOfPictures: '84',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-03.jpg',
    imageAlt: "ex3",
  },
  {
    categoryId: 4,
    href: '#',
    categoryName: 'category4',
    numOfPictures: '22',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-04.jpg',
    imageAlt: "ex4",
  }
]

export default function CategoryDetail() {
  return (
    <div className="bg-white">
    
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-0 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-black justify-start">카테고리 명</h2>
        <div className="space-x-2 flex justify-end">
        </div>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {categories.map((category) => (
            <div key={category.categoryId} className="group relative">
              <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                <img
                  src={category.imageSrc}
                  alt={category.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-0 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={category.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      <p className="mt-1 text-sm text-gray-900">{category.categoryName}</p>
                      <p className="mt-1 text-sm text-gray-500">{category.numOfPictures}</p>
                    </a>
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
