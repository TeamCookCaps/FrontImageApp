import React from 'react';
import Banner from '../components/Banner';
import BlurBox from '../components/BlurBox';
import { useAuthContext } from '../context/AuthContext';
import { BsPlusCircleFill } from 'react-icons/bs';
import Main from '../components/Main';

export default function Home() {
  const { user } = useAuthContext();
  return (
    <>
      {!user && <BlurBox />}
      {user && (
        <>
          <Banner />
          <Main />
          <BsPlusCircleFill className="text-7xl fixed bottom-10 right-10 hover:cursor-pointer" />
        </>
      )}
    </>
  );
}
