import React from 'react';
import { HiHome } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

export default function UserItem({ user }) {
  const navigate = useNavigate();
  console.log("userItem");
  console.log(user);

  const handleGoPage = () => {
    navigate(`/user/${user.uid}`,{
      state: { user },
    });
  }

  return (
    <div className="flex justify-center mb-3">
      <img
        className="w-8 h-8 ml-2 mr-2 rounded-full"
        src={user.profile_img}
        alt={user.nick_name}
      />
      <span className="relative w-full text-xl truncate ">{user.nick_name}</span>
      <HiHome className="flex text-3xl justify-end ml-5 mr-5 text-gray-400 hover:text-gray-700" onClick={handleGoPage}/>
    </div>
  );
}
