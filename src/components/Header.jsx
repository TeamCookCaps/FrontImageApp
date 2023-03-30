import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { RxPerson } from 'react-icons/rx';
import { MdLogout } from 'react-icons/md';
import User from './User';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { user, login, logout } = useAuthContext();
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setText(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleOnKeyDown = (e) => {
    if(e.code === 'Enter' && e.nativeEvent.isComposing === false){
      navigate('/search',{state:{searchWord : `${text}`}});
      setText('')
    }
  }

  return (
    <header className="w-full flex items-center justify-between mb-10">
      {!user && <div className="w-9/12" />}
      {user && (
        <form
          className="w-9/12 flex items-center gap-3"
          onSubmit={handleSubmit}
        >
          <BiSearch className="text-2xl" />
          <input
            className="w-full outline-none text-xl"
            type="text"
            value={text}
            placeholder="Search photo"
            onChange={handleChange}
            onKeyDown={handleOnKeyDown}
          />
        </form>
      )}
      <div className="flex items-center gap-3">
        {user && <User user={user} />}
        {!user && (
          <RxPerson
            className="text-xl transition-all hover:cursor-pointer hover:scale-110"
            onClick={login}
          />
        )}
        {user && (
          <MdLogout
            className="text-xl transition-all hover:cursor-pointer hover:scale-110"
            onClick={logout}
          />
        )}
      </div>
    </header>
  );
}
