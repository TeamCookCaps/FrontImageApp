import React from 'react';
import Banner from '../components/Banner';
import BlurBox from '../components/BlurBox';
import { useAuthContext } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuthContext();
  return (
    <>
      {!user && <BlurBox />}
      {user && <Banner />}
    </>
  );
}
