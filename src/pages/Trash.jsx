import React from 'react';
import RemoveAllPhoto from '../components/RemoveAllPhoto';

// 임시 데이터
const products = [
  {
    photoId: 1,
    href: '#',
    category: '메모',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-01.jpg',
    imageAlt: "ex1",
  },
  {
    photoId: 2,
    href: '#',
    category: '책상',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-02.jpg',
    imageAlt: "ex2",
  },
  {
    photoId: 3,
    href: '#',
    category: '지갑',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-03.jpg',
    imageAlt: "ex3",
  },
  {
    photoId: 4,
    href: '#',
    category: '상자',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-04.jpg',
    imageAlt: "ex4",
  }
]



export default function Trash() {
  return (
    <div className="bg-white">
    
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-0 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-black justify-start">휴지통</h2>
        <div className="space-x-2 flex justify-end">
          <button class="bg-transparent hover:bg-blue-400 text-blue-700 font-semibold hover:text-white py-2 px-2 border border-blue-500 hover:border-transparent rounded">모두 복구하기</button>
          <RemoveAllPhoto />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.photoId} className="group relative">
              <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-0 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      <p className="mt-1 text-sm text-gray-500"># {product.category}</p>
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
