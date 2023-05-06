import React, { useState } from 'react';
import { downloadFile } from '../api/search';
import { FiDownload } from 'react-icons/fi';
import { FcLike, FcDislike } from 'react-icons/fc';
import { AiFillDelete } from 'react-icons/ai';
import { removeOneImage } from '../api/trash';
import { useAuthContext } from '../context/AuthContext';
import { useLike } from '../hook/useLike';
import { useNavigate } from 'react-router-dom';

export default function PhotoDeatilDescription({
  photo: {
    image_id,
    image_width,
    image_height,
    image_date,
    image_location,
    parent_name,
    category_name,
    image_url,
    favorite_yn,
  },
  photos,
}) {
  const { user } = useAuthContext();
  const [like, setLike] = useState(() => {
    return localStorage.getItem(`photo-${image_id}`) || favorite_yn;
  });
  const updateKey = `photo-${image_id}`;
  const { mutate } = useLike(updateKey);
  const result_date = new Date(image_date).toString();
  const navigate = useNavigate();

  const handleLikeClick = () => {
    const newLike = like === 'y' ? 'n' : 'y';
    setLike(newLike);
    localStorage.setItem(updateKey, newLike);
    mutate({ uid: user?.uid, id: image_id });
  };
  const handleDelete = async () => {
    try {
      await removeOneImage(user.uid, image_id);

      const updatedPhotos = photos.filter((p) => p.image_id !== image_id);
      // 사진이 한장도 남아있지 않다면 이전 페이지로 이동
      if (updatedPhotos.length === 0) {
        navigate(-1);
        return;
      }
      const currentIndex = updatedPhotos.findIndex(
        (p) => p.image_id === image_id
      );
      const nextIndex = (currentIndex + 1) % updatedPhotos.length;

      navigate(
        `/allPhoto/${updatedPhotos[nextIndex].category_name}/${updatedPhotos[nextIndex].imageName}`,
        {
          state: { photo: updatedPhotos[nextIndex], photos: updatedPhotos },
          replace: true, // 기록을 남기지 않도록 설정
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-2/6 h-full flex flex-col justify-center items-center m-4">
      <div className="text-center text-3xl">
        <h2 className="text-4xl font-bold pb-5">
          {parent_name} &gt; {category_name}
        </h2>
        <p className="text-gray-600 pb-4">width : {image_width}</p>
        <p className="text-gray-600 pb-4">height : {image_height}</p>
        <p className="text-gray-600 pb-4">
          업로드 날짜 : {getDate(result_date)}
        </p>
        {image_location && (
          <p className="text-gray-600 pb-4">위치 : {image_location}</p>
        )}
      </div>
      <div className="flex justify-center mt-5 space-x-5 text-2xl">
        {like === 'n' ? (
          <button
            onClick={handleLikeClick}
            className="bg-red-300 text-white px-4 py-3 rounded-lg flex items-center space-x-2 whitespace-nowrap"
          >
            <FcLike />
            <span>좋아요</span>
          </button>
        ) : (
          <button
            onClick={handleLikeClick}
            className="bg-red-300 text-white px-4 py-3 rounded-lg flex items-center space-x-2 whitespace-nowrap"
          >
            <FcDislike />
            <span>취소</span>
          </button>
        )}
        <button
          className="bg-yellow-300 text-white px-4 py-3 rounded-lg flex items-center space-x-2 whitespace-nowrap"
          onClick={() => {
            downloadFile(image_url);
          }}
        >
          <FiDownload />
          <span>다운로드</span>
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-3 rounded-lg flex items-center space-x-2 whitespace-nowrap"
          onClick={handleDelete}
        >
          <AiFillDelete />
          <span>삭제</span>
        </button>
      </div>
    </div>
  );
}

function getDate(date_str) {
  const date = new Date(date_str);

  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minites = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return (
    date.getFullYear().toString() +
    '-' +
    month +
    '-' +
    day +
    ' ' +
    hour +
    ':' +
    minites +
    ':' +
    seconds
  );
}
