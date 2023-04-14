import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { search } from '../api/search';
import DetailModal from '../components/DetailModal';
import Loading from '../components/Loading';
import Masonry from "react-masonry-css";
import MasonryItem from '../components/MasonryItem';
import { useAuthContext } from '../context/AuthContext';

export default function Search() {
  const { user }= useAuthContext();
  const location = useLocation();

  const searchWord = location.state.searchWord;
  const color = location.state.color;

  const [isShow, setIsShow] = useState(false);
  const [info, setInfo] = useState([]);


  const { isLoading,isFetching, error, data : result } = useQuery({
    queryKey : 'data',
    queryFn : () => search(user.uid, searchWord,color)
  },{refetchOnWindowFocus: false}); 

  if(isLoading || isFetching){
    return (
      <>
        <Loading/>
      </>
    )
  }

  if(error) {
    return (<div>에러가 발생했습니다 : {error}</div>)
  }

  return (
    <section className="flex flex-col gap-5 py-5 px-5">
      <section className="mb-4">
        <header>
            <h2 className="text-2xl font-bold tracking-tight text-black justify-start">
              {searchWord && color && `"${searchWord}" 키워드 ${color} 색상 검색 결과`}
              {searchWord && !color && `"${searchWord}" 검색 결과` }
              {color && !searchWord && `${color} 색상 검색 결과` }
            
            </h2>
          </header>
      </section>
      <section>
      {result.length === 0 && <div> 검색 결과가 없습니다! </div>}
          <Masonry 
            className="flex animate-slide-fwd"
            breakpointCols={{
              default: 4,
              1100: 3,
              700: 2,
              500: 1
            }}>
          {result && result?.map((search) => (
            <MasonryItem
              search = {search}
              isShow = {setIsShow}
              info = {setInfo}/>
            ))}
          {isShow && <DetailModal setIsShow={setIsShow} info={info}/>}
        </Masonry>
      </section>
    </section>
  )
}
