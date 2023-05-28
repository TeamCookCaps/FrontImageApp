import React, { useState } from 'react';
import { HiHeart } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { getImageName } from '../utils/imageUtils';

export default function LikeCategoryCard({ photo: { uid, image_id, image_width, image_height, image_date, image_location, parent_name, category_name, image_url, favorite_yn, delete_yn } , photos}) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate()
  const imageName = getImageName(image_url);
  const photo = { uid, image_id, image_width, image_height, image_date, image_location, parent_name, category_name, image_url, favorite_yn, delete_yn }

  const handleNavigate = () =>
  navigate(`/allPhoto/${category_name}/${imageName}`, {
    state: { photo, photos },
  });

  if(favorite_yn == 'y') {
  return (
    <li className="flex flex-col pb-10 shrink-0">
      <div className="relative w-48 h-48">
        <img
          className={`w-48 h-48 object-cover rounded-xl shadow-md transition duration-300 ${
            hovered ? 'scale-95' : 'scale-100'
          } hover:cursor-pointer hover:ease-out`}
          src={image_url}
          alt={image_id}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => handleNavigate()}
        />
        <HiHeart className="absolute top-3 right-4 text-4xl text-red-400 hover:cursor-pointer" />
      </div>
    </li>
  );
  }
}
