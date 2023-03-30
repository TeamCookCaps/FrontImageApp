import React, { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { HiHeart } from 'react-icons/hi';

export default function CategoryCard({
  photo: { id, image_url },
  numOfPhotos,
  isFavorite,
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <li className="flex flex-col pb-10 shrink-0">
      <div className="relative w-48 h-48">
        <img
          className={`w-48 h-48 object-cover rounded-xl shadow-md transition duration-300 ${
            hovered ? 'scale-95' : 'scale-100'
          } hover:cursor-pointer hover:ease-out`}
          src={image_url} // 임시
          alt={id} // 임시
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        />
        {isFavorite && (
          <HiHeart className="absolute top-3 right-4 text-4xl text-red-400 hover:cursor-pointer" /> // 임시
        )}
      </div>
      {!isFavorite && (
        <>
          <div className="w-48 flex items-center justify-between pt-3 pl-1">
            <p className="font-medium text-xl text-gray-900">{id}</p>
            <FaEllipsisV className="text-lg" />
          </div>
          <span className="pl-1 text-lg text-gray-400 font-normal">
            {numOfPhotos}
          </span>
        </>
      )}
    </li>
  );
}
