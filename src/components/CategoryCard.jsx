import React from 'react';

export default function CategoryCard({ photo: { id, image_url } }) {
  return (
    <li className="flex flex-col pb-10">
      <img
        className="w-48 h-48 rounded-xl shadow-md"
        src={image_url} // 임시
        alt={id} // 임시
      />
      <p className="pl-1 pt-3 font-medium text-xl text-gray-900">{id}</p>
      {/* <span className="pl-1 text-lg text-gray-400 font-normal">
        {numOfPictures}
      </span> */}
    </li>
  );
}
