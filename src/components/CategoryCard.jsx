import React, { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { downloadPhotosAsZip } from '../utils/downloadUtils';
import { useAuthContext } from '../context/AuthContext';
import { removeOneImage } from '../api/trash';
import { toast, ToastContainer } from 'react-toastify';

export default function CategoryCard({
  photos,
  categoryName,
  numOfPhotos,
  refetch,
}) {
  const { user } = useAuthContext();
  const [hovered, setHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () =>
    navigate(`/allPhoto/${photos[0].category_name}`, {
      state: { photos },
    });
  const handleDownload = async () => {
    await downloadPhotosAsZip(photos, categoryName);
    setIsOpen(false); // 다운로드 버튼 클릭 후 드롭다운 메뉴 닫기
  };
  const handleDelete = async () => {
    try {
      for (const photo of photos) {
        await removeOneImage(user.uid, photo.id);
      }
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

  return (
    <li className="flex flex-col pb-24 shrink-0">
      <div className="relative w-48 h-48">
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={true}
          pauseOnHover={false}
        />
        <img
          className={`w-48 h-48 object-cover rounded-xl shadow-md transition duration-300 ${
            hovered ? 'scale-95' : 'scale-100'
          } hover:cursor-pointer hover:ease-out`}
          src={photos[numOfPhotos - 1].image_url} // 가장 최근에 올린 사진을 카테고리 썸네일로 보이게
          alt={photos[numOfPhotos - 1].id}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={handleNavigate}
          loading="lazy"
        />
        <div className="w-48 flex items-center justify-between pt-3 pl-1">
          <p className="font-medium text-xl text-gray-900">
            {categoryName === null ? '기타' : categoryName}
          </p>
          <FaEllipsisV
            onClick={() => setIsOpen(!isOpen)}
            className="text-lg cursor-pointer"
          />
          <AnimatePresence>
            {isOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-60 right-1 bg-white py-2 px-4 shadow-md rounded z-30"
              >
                <motion.li
                  onClick={handleDownload}
                  className="cursor-pointer mb-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  다운로드
                </motion.li>
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
        <span className="pl-1 text-lg text-gray-400 font-normal">
          {numOfPhotos}
        </span>
      </div>
    </li>
  );
}
