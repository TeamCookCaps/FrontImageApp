import React from 'react';

// 임시 데이터
const recommands = [
  {
    photoId: 1,
    href: '#',
    category: 'category1',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
    imageAlt: "ex1",
  },
  {
    photoId: 2,
    href: '#',
    category: 'category2',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
    imageAlt: "ex2",
  },
  {
    photoId: 3,
    href: '#',
    category: 'category3',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
    imageAlt: "ex3",
  },
  {
    photoId: 4,
    href: '#',
    category: 'category4',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
    imageAlt: "ex4",
  },
  {
    photoId: 5,
    href: '#',
    category: 'category5',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
    imageAlt: "ex5",
  }

  
]

export default function RecommandPhoto() {
  return (
    <div className="bg-white">
    
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-0 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-black justify-start">배경사진 추천</h2>
        <div className="space-x-2 flex justify-end">
        </div>
        <div className="mt-6 grid grid-rows-1 gap-y-10 gap-x-6 sm:grid-rows-2 lg:grid-rows-4 xl:gap-x-8">
          {recommands.map((recommand) => (
            <div key={recommand.photoId} className="group relative">
              <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                <img
                  src={recommand.imageSrc}
                  alt={recommand.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-0 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={recommand.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      <p className="mt-1 text-sm text-gray-500"># {recommand.category}</p>
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
