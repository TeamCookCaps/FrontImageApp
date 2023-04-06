import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { search } from '../api/search';
import DetailModal from '../components/DetailModal';

export default function Search() {
  const location = useLocation();
  const searchWord = location.state.searchWord;
  const color = location.state.color;

  const [isShow, setIsShow] = useState(false);
  const [info, setInfo] = useState([]);

  const { isLoading,isFetching, error, data : result } = useQuery({
    queryKey : 'data',
    queryFn : () => search(searchWord,color)
  },{refetchOnWindowFocus: false}); 

  if(isLoading || isFetching){
    return (<>isLoading... </>)
  }

  if(error) {
    return (<div>에러가 발생했습니다 : {error}</div>)
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
        <div className="grid grid-cols-1 gap-y-5 gap-x-5 sm:grid-cols-2 lg:grid-cols-4 xl:gap-cols-6">
          {result && result?.map((search) => (
            <div key={search?.id} className="group relative">
              <button className="min-h-200 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-40"
                      onClick={()=> {setIsShow(true); setInfo(search)}}>
                <img alt="image"
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  src={search?.image_url}/>
              </button>
            </div>
          ))}
          {isShow && <DetailModal setIsShow={setIsShow} info={info}/>}
        </div>
      </section>
    </section>
  )
}
