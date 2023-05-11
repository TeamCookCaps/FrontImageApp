import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { search } from '../api/search';
import DetailModal from '../components/DetailModal';
import Loading from '../components/Loading';
import Masonry from 'react-masonry-css';
import MasonryItem from '../components/MasonryItem';
import { useAuthContext } from '../context/AuthContext';
import UserItem from '../components/UserItem';

export default function Search() {
  const { user } = useAuthContext();
  const location = useLocation();

  const searchWord = location.state.searchWord;
  const color = location.state.color;

  const [openModalId, setOpenModalId] = useState(null);
  const [modalItem, setModalItem] = useState(null);

  const {
    isLoading,
    isFetching,
    error,
    data: result,
  } = useQuery(
    {
      queryKey: 'data',
      queryFn: () => search(user.uid, searchWord, color),
    },
    { refetchOnWindowFocus: false }
  );

  const handleOpenModal = (id) => {
    setOpenModalId(id);
  };

  const handleUpdateItem = (item) => {
    setModalItem(item);
  };

  const handleCloseModal = () => {
    setOpenModalId(null);
  };

  useEffect(() => {
    if (result !== undefined && openModalId != null) {
      setModalItem(result.searchList.find((item) => item.id === openModalId));
    }
  }, [openModalId, result]);

  if (isLoading || isFetching) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (error) {
    return <div>에러가 발생했습니다 : {error}</div>;
  }

  return (
    <section className="flex flex-col gap-5 py-3 px-4">
      <header>
        <h2 className="mb-6 text-3xl font-bold tracking-tight text-black justify-start">
          {searchWord &&
            color &&
            `"${searchWord}" 키워드 ${color} 색상 검색 결과`}
          {searchWord && !color && `"${searchWord}" 검색 결과`}
          {color && !searchWord && `${color} 색상 검색 결과`}
        </h2>
      </header>
      <section>
        <h3 className="text-2xl font-bold mb-4">사용자</h3>
        {result.user.length === 0 && (
          <div className="text-xl"> 사용자 검색 결과가 없습니다! </div>
        )}
        {result?.user.length !== 0 && (
          <>
            {result?.user.map((item) => (
              <UserItem user={item} />
            ))}
          </>
        )}
      </section>
      <hr />
      <section>
        <h3 className="text-2xl font-bold mb-4">이미지</h3>
        {result.searchList.length === 0 && (
          <div className="text-xl"> 이미지 검색 결과가 없습니다! </div>
        )}
        {result.searchList.length !== 0 && (
          <>
            <Masonry
              className="flex animate-slide-fwd"
              breakpointCols={{
                default: 4,
                1100: 3,
                700: 2,
                500: 1,
              }}
            >
              {result &&
                result?.searchList.map((search) => (
                  <MasonryItem search={search} onOpenModal={handleOpenModal} />
                ))}
              {openModalId !== null && (
                <DetailModal
                  onClose={handleCloseModal}
                  info={modalItem}
                  user={user}
                  onUpdateItem={handleUpdateItem}
                />
              )}
            </Masonry>
          </>
        )}
      </section>
    </section>
  );
}
