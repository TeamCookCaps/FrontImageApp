import React from 'react';
import { HiHome } from 'react-icons/hi';

export default function UserItem({ user: { profile_img, nick_name } }) {
  return (
    <div className="flex justify-center mb-3">
      <img
        className="w-8 h-8 ml-2 mr-2 rounded-full"
        src={profile_img}
        alt={nick_name}
      />
      <span className="relative w-full text-xl truncate ">{nick_name}</span>
      <HiHome className="flex text-3xl justify-end ml-5 mr-5 text-gray-400 hover:text-gray-700"/>
    </div>
  );
}
