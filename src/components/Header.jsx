import React, { useState } from 'react';
import { RxPerson } from 'react-icons/rx';
import { MdLogout } from 'react-icons/md';
import User from './User';
import { useAuthContext } from '../context/AuthContext';
import Searchbar from './Searchbar';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

export default function Header() {
  const { user, login, logout } = useAuthContext();
  const [shared, setShared] = useState(() => {
    const userShared = localStorage.getItem(`shared-${user?.uid}`);
    return userShared ? JSON.parse(userShared) : false;
  });

  const handleToggle = () => {
    const newShared = !shared;
    setShared(newShared);
    localStorage.setItem(`shared-${user?.uid}`, JSON.stringify(newShared));
  };

  return (
    <header className="w-full flex items-center justify-between mb-10">
      {!user && <div className="w-9/12" />}
      {user && <Searchbar shared={shared} />}
      <div className="flex items-center gap-3">
        {user && (
          <Toggle checked={shared} onChange={handleToggle} icons={false} />
        )}
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
