import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getImageName } from '../utils/imageUtils';
import { getImageDescription } from '../api/gallery';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEllipsisV } from 'react-icons/fa';
import { removeOneImage } from '../api/trash';
import { useAuthContext } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';

export default function GalleryCard({ galleryImage, refetch }) {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [isTallImage, setIsTallImage] = useState(false);
  const [description, setDescription] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = galleryImage.image_url;
    image.onload = () => {
      const aspectRatio = image.width / image.height;
      setIsTallImage(aspectRatio > 1); // 세로 길이가 더 긴 이미지인지 확인
    };

    // 이미지 설명을 가져오는 API 호출
    getImageDescription(galleryImage.id) //
      .then((response) => {
        setDescription(response[0].description);
      });
  }, [galleryImage]);

  const handleNavigate = () => {
    navigate(`/gallery/${getImageName(galleryImage.image_url)}`, {
      state: { galleryImage },
    });
  };
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  const handleDelete = async () => {
    try {
      await removeOneImage(user.uid, galleryImage.id);
      refetch();

      toast.success('사진이 삭제되었습니다!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } catch (error) {
      toast.error('삭제 도중 오류가 났습니다!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      console.error(error);
    }
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
    setIsHovered(false);
  };

  return (
    <div
      className="group relative h-60 w-60 md:w-72 md:h-72 lg:w-80 lg:h-80"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={true}
        pauseOnHover={false}
      />
      <img
        className={`${imageLoaded ? '' : 'hidden'}
          cursor-pointer
          object-cover
          rounded-2xl
          transition
          delay-300
          w-full
          h-full
          shadow-lg
          ${isHovered ? 'opacity-0' : 'opacity-100'}
        `}
        src={galleryImage.image_url}
        alt={galleryImage.id}
        onClick={handleNavigate}
        onLoad={handleImageLoad}
      />
      <div
        className={`
        ${isHovered ? 'opacity-100' : 'opacity-0'}
          absolute
          top-0
          transition
          delay-300
          duration-200
          w-full
          z-10
          ${isTallImage ? 'scale-150' : 'scale-125'}
          ${!isTallImage && '-translate-y-[5vw]'}
        `}
      >
        <img
          className="
            cursor-pointer
            object-cover
            transition
            duration
            shadow-lg
            rounded-t-md
            w-full
            h-full
          "
          src={galleryImage.image_url}
          alt={galleryImage.id}
          onClick={handleNavigate}
        />
        <div
          className="
            z-10
            bg-zinc-800
            p-2
            lg:p-4
            absolute
            w-full
            transition
            shadow-md
            rounded-b-md
          "
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-yellow-300 font-bold text-xl">Description</h2>
              <FaEllipsisV
                onClick={() => setIsOpen(!isOpen)}
                className="text-lg text-white cursor-pointer"
              />
              <AnimatePresence>
                {isOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-12 right-5 bg-white py-2 px-4 shadow-md rounded"
                  >
                    <motion.li
                      onClick={handleDelete}
                      className="cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      삭제하기
                    </motion.li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
            <span className="text-white">
              {description ? description : '이미지 설명 없음'}
            </span>
          </div>
        </div>
      </div>
      {!imageLoaded && (
        <div className="flex justify-center items-center w-full h-full">
          <svg
            className="animate-spin w-32 h-32 text-gray-500"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M 16 3 C 14.34375 3 13 4.34375 13 6 C 13 7.65625 14.34375 9 16 9 C 17.65625 9 19 7.65625 19 6 C 19 4.34375 17.65625 3 16 3 Z M 8.9375 6.4375 C 7.558594 6.4375 6.4375 7.558594 6.4375 8.9375 C 6.4375 10.316406 7.558594 11.4375 8.9375 11.4375 C 10.316406 11.4375 11.4375 10.316406 11.4375 8.9375 C 11.4375 7.558594 10.316406 6.4375 8.9375 6.4375 Z M 23.0625 7.9375 C 22.511719 7.9375 22.0625 8.386719 22.0625 8.9375 C 22.0625 9.488281 22.511719 9.9375 23.0625 9.9375 C 23.613281 9.9375 24.0625 9.488281 24.0625 8.9375 C 24.0625 8.386719 23.613281 7.9375 23.0625 7.9375 Z M 6 13.75 C 4.757813 13.75 3.75 14.757813 3.75 16 C 3.75 17.242188 4.757813 18.25 6 18.25 C 7.242188 18.25 8.25 17.242188 8.25 16 C 8.25 14.757813 7.242188 13.75 6 13.75 Z M 26 14.75 C 25.308594 14.75 24.75 15.308594 24.75 16 C 24.75 16.691406 25.308594 17.25 26 17.25 C 26.691406 17.25 27.25 16.691406 27.25 16 C 27.25 15.308594 26.691406 14.75 26 14.75 Z M 8.9375 21.0625 C 7.832031 21.0625 6.9375 21.957031 6.9375 23.0625 C 6.9375 24.167969 7.832031 25.0625 8.9375 25.0625 C 10.042969 25.0625 10.9375 24.167969 10.9375 23.0625 C 10.9375 21.957031 10.042969 21.0625 8.9375 21.0625 Z M 23.0625 21.5625 C 22.234375 21.5625 21.5625 22.234375 21.5625 23.0625 C 21.5625 23.890625 22.234375 24.5625 23.0625 24.5625 C 23.890625 24.5625 24.5625 23.890625 24.5625 23.0625 C 24.5625 22.234375 23.890625 21.5625 23.0625 21.5625 Z M 16 24.25 C 15.035156 24.25 14.25 25.035156 14.25 26 C 14.25 26.964844 15.035156 27.75 16 27.75 C 16.964844 27.75 17.75 26.964844 17.75 26 C 17.75 25.035156 16.964844 24.25 16 24.25 Z" />
          </svg>
        </div>
      )}
    </div>
  );
}
