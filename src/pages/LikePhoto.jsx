import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import Loading from '../components/Loading';
import { getImageinfo } from '../api/database';
import Masonry from 'react-masonry-css';
import { useNavigate } from 'react-router-dom';
import { getImageName } from '../utils/imageUtils';
import { getFavoriteImages } from '../api/favorite';
import { useLocation } from 'react-router-dom';

export default function LikePhoto() {
  //const { user } = useAuthContext();
  // const {
  //   state: { user },
  // } = useLocation();
  const location = useLocation()
  const [userId, setUserId] = useState(
    location.state?.userId
  );
  //const user = location.state.user
  //const { user } = useLocation()
  console.log("user : " + userId)
  // const {
  //   isLoading,
  //   isFetching,
  //   error,
  //   data: result,
  // } = useQuery(['images'], () => getImageinfo(user.uid));

  const {
    isLoading,
    isFetching,
    error,
    data: favoriteImages,
  } = useQuery(['favoriteImages'], () => getFavoriteImages(userId));

  //const favoriteImages = favoriteImageInfo?.filter((photo) => photo.favorite_yn == 'y');
  //let favoriteImages = Object.entries(favoriteImageInfo);
  const navigate = useNavigate();

  const handleNavigate = (photo) => {
    const imageName = getImageName(photo?.image_url);
    navigate(`/allPhoto/${photo?.category_name}/${imageName}`, {
      state: { photo, photos: favoriteImages },
    });
  };

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
    <>
      <div className="bg-white">
        <h2 className="text-4xl font-bold p-4 tracking-tight text-black justify-start">
          좋아요 한 사진
        </h2>
        <Masonry
          className="flex animate-slide-fwd"
          breakpointCols={{
            default: 4,
            1100: 3,
            700: 2,
            500: 1,
          }}
        >
          {favoriteImages &&
            favoriteImages.map((image) => (
              <div key={image?.id} className="relative w-full p-3">
                <img
                  src={image?.image_url}
                  alt="image"
                  className="h-full w-full cursor-pointer object-cover transition-all"
                  onClick={() => handleNavigate(image)}
                />
              </div>
            ))}
        </Masonry>
      </div>
    </>
  );
}
