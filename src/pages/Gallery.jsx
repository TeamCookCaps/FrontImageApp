import React, { useEffect, useState } from 'react';
import GalleryCard from '../components/GalleryCard';
import { useAuthContext } from '../context/AuthContext';
import { BsPlusCircleFill } from 'react-icons/bs';
import Upload from '../components/Upload';
import { getGalleryImage } from '../api/gallery';
import { useQuery } from '@tanstack/react-query';
import Masonry from 'react-masonry-css';

export default function Gallery() {
  const { user } = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const gallery_yn = 'Y';

  const {
    isLoading,
    error,
    data: initialGalleryImages, // 초기 갤러리 이미지 데이터
    refetch: refetchGalleryImages, // 다시 불러오기 함수
  } = useQuery(['galleryImages'], () => getGalleryImage(user.uid));

  useEffect(() => {
    if (initialGalleryImages) {
      setGalleryImages(initialGalleryImages);
    }
  }, [initialGalleryImages]);

  const handleUploadSuccess = () => {
    setShowModal(false);
    refetchGalleryImages(); // 갤러리 이미지 다시 불러오기
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) {
    return <div>에러가 발생했습니다 : {error}</div>;
  }

  return (
    <>
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
            <div class="w-full cursor-pointer sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 px-4 mb-6">
              <GalleryCard
                key={galleryImage.image_id}
                galleryImages={galleryImage}
              />
            </div>
          ))}
      </Masonry>

      <BsPlusCircleFill
        className="text-7xl fixed bottom-10 right-10 hover:cursor-pointer"
        onClick={() => setShowModal(true)}
      />
      {showModal && (
        <Upload
          setShowModal={setShowModal}
          user={user}
          gallery_yn={gallery_yn}
          onUploadSuccess={handleUploadSuccess} // 업로드 성공 핸들러 전달
        />
      )}
    </>
  );
}
