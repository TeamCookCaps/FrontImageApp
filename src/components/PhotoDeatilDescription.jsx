import React, { useState } from 'react';
import { downloadFile } from '../api/search';
import { FiDownload } from 'react-icons/fi';
import { FcLike, FcDislike } from 'react-icons/fc';
import { AiFillDelete } from 'react-icons/ai';
import { removeOneImage } from '../api/trash';
import { useAuthContext } from '../context/AuthContext';

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
  },
}) {
  const { user } = useAuthContext();
  const [like, setLike] = useState(true); // 테이블 바뀌어서 수정
  const result_date = new Date(image_date).toString();

  const handleLikeClick = () => {
    setLike((prevLike) => !prevLike);
  };
  const handleDelete = () => {
    removeOneImage(user.uid, image_id);
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
        {like ? (
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
