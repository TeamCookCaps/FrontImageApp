import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ChatModal from '../components/ChatModal';
import { useQuery } from '@tanstack/react-query';
import { getGalleryImage } from '../api/gallery';
import GalleryCard from '../components/GalleryCard';
import Masonry from 'react-masonry-css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getImageinfo } from '../api/database';
import { getFavoriteImages } from '../api/favorite';
import LikeCategoryCard from '../components/LikeCategoryCard';
import CategoryCard from '../components/CategoryCard';

export default function UserPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [user, setUser] = useState(
    location.state?.user
  );
  const [showModal, setShowModal] = useState(false);

  const {
    isLoading,
    error,
    data: photos,
    refetch,
  } = useQuery(['photos'], () => getImageinfo(user.uid));

  const {
    isLoading2,
    error2,
    data: favoriteImages,
  } = useQuery(['favoriteImages'], () => getFavoriteImages(user.uid));

  const { isLoading3, error3, data: galleryImages } = useQuery(
    ['galleryImage'], () => getGalleryImage(user.uid),
  );

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

  if (isLoading || isLoading2 || isLoading3) return <p>Loading...</p>;
  if (error || error2 || error3) return <p>{error}</p>;

  return (
    <>
      <section className="px-4">
        <div className="flex flex-col items-center space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
          <img
            src={user.profile_img}
            alt={user.nick_name}
            className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start dark:bg-gray-500 dark:border-gray-700"
          />
          <h1 className="text-xl font-semibold md:text-left">
            {user.nick_name}
          </h1>
          <button onClick={() => setShowModal(true)} className='bg-yellow-300 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded'>커미션</button>
        </div>
      </section>
      {/* <Main user={user} /> */}
      <section className="flex flex-col gap-16 py-14 px-4">
      <section className="mb-6">
        <header className="flex justify-between pb-5">
          <h2 className="text-3xl font-bold">좋아요 누른 사진</h2>
          <Link to={"/like"} state={{ userId: user?.uid }}>
          <button
            className="border rounded-lg px-4 py-2 mr-11 font-normal text-xl hover:bg-yellow-300 hover:border-yellow-300"
          >
            모두 보기
          </button>
          </Link>
        </header>
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {favoriteImages &&
            favoriteImages
              .slice(0, 5)
              .map((photo) => (
                <LikeCategoryCard
                  key={photo.id}
                  photo={photo}
                  photos={favoriteImages}
                />
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
                refetch={refetch}
              />
            ))}
        </ul>
      </section>
      </section>
      <section>
        <h2 className="pb-7 text-3xl font-bold">Gallery</h2>
        <Masonry
          className="flex animate-slide-fwd"
          breakpointCols={{
            default: 3,
            1300: 2,
            900: 1,
          }}
        >
          {galleryImages &&
            galleryImages.map((galleryImage) => (
              <div class="w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 px-4 mb-6">
                <GalleryCard
                  key={galleryImage.image_id}
                  galleryImage={galleryImage}
                />
              </div>
            ))}
        </Masonry>
      </section>

      {showModal && <ChatModal setShowModal={setShowModal} receiver={user} />}
    </>
  );
}