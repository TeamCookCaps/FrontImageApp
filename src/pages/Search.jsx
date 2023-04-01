import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { search } from '../api/search';

const searchList = [
  {
    id: 1,
    href: '#',
    category: '카테고리1',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-01.jpg',
  },
  {
    id: 2,
    href: '#',
    category: '카테고리2',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-02.jpg',
  },
  {
    id: 3,
    href: '#',
    category: '카테고리3',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-03.jpg',
  },
  {
    id: 4,
    href: '#',
    category: '카테고리4',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-04.jpg',
  },
]
export default function Search() {
  const location = useLocation();
  const searchWord = location.state.searchWord;

  const { isLoading,isFetching, error, data : result } = useQuery({
    queryKey : ['data'],
    queryFn : () => search(searchWord)
  }); 
  if(isLoading || isFetching){
    return (<div>로딩 중</div>)
  }
  if(error) {
    return (<div>에러가 발생했습니다 : {error}</div>)
  }

  if(result){
    console.log(result);
  }
  return (
    <section className="flex flex-col gap-5 py-5 px-5">
      <section className="mb-4">
        <header>
          <h2 className="text-2xl font-bold tracking-tight text-black justify-start">"{searchWord}" 검색 결과</h2>
        </header>
      </section>
      <section>
      {result.length === 0 && <div> 검색 결과가 없습니다! </div>}
        <div className="grid grid-cols-1 gap-y-5 gap-x-5 sm:grid-cols-4 lg:grid-cols-6 xl:gap-cols-8">
          {result && result?.map((search) => (
            <div key={search?.id} className="group relative">
              <div className="min-h-200 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-40">
                <a href={search?.image_url}>
                <img
                  src={search?.image_url}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  )
}
