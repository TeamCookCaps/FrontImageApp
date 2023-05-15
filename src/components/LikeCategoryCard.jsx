import React, { useState } from 'react';
import { HiHeart } from 'react-icons/hi';

export default function LikeCategoryCard({ photo: { id, image_url, favorite_yn } }) {
  const [hovered, setHovered] = useState(false);

  //console.log("yn : " + favorite_yn)

  if(favorite_yn == 'y') {
  return (
    <li className="flex flex-col pb-10 shrink-0">
      <div className="relative w-48 h-48">
        <img
          className={`w-48 h-48 object-cover rounded-xl shadow-md transition duration-300 ${
            hovered ? 'scale-95' : 'scale-100'
          } hover:cursor-pointer hover:ease-out`}
          src={image_url}
          alt={id}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        />
        <HiHeart className="absolute top-3 right-4 text-4xl text-red-400 hover:cursor-pointer" />
      </div>
    </li>
  );
  }
}
