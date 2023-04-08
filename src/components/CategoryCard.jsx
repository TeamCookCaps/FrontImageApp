import React, { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function CategoryCard({ photos, categoryName, numOfPhotos }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () =>
    navigate(`/allPhoto/${photos[0].category_name}`, {
      state: { photos },
    });

  return (
    <li className="flex flex-col pb-10 shrink-0">
      <div className="relative w-48 h-48">
        <img
          className={`w-48 h-48 object-cover rounded-xl shadow-md transition duration-300 ${
            hovered ? 'scale-95' : 'scale-100'
          } hover:cursor-pointer hover:ease-out`}
          src={photos[numOfPhotos - 1].image_url} // 가장 최근에 올린 사진을 카테고리 썸네일로 보이게
          alt={photos[numOfPhotos - 1].id}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={handleNavigate}
        />
        <div className="w-48 flex items-center justify-between pt-3 pl-1">
          <p className="font-medium text-xl text-gray-900">{categoryName}</p>
          <FaEllipsisV className="text-lg" />
        </div>
        <span className="pl-1 text-lg text-gray-400 font-normal">
          {numOfPhotos}
          {console.log(photos) /* 나중에 삭제 */}
        </span>
      </div>
    </li>
  );
}
