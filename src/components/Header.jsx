import React from 'react';
import { RxPerson } from 'react-icons/rx';
import { MdLogout } from 'react-icons/md';
import User from './User';
import { useAuthContext } from '../context/AuthContext';
import Searchbar from './Searchbar';

export default function Header() {
  const { user, login, logout } = useAuthContext();

  return (
    <header className="w-full flex items-center justify-between mb-10">
      {!user && <div className="w-9/12" />}
      {user && <Searchbar />}
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
