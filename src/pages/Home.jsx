import React, { useState } from 'react';
import Banner from '../components/Banner';
import BlurBox from '../components/BlurBox';
import { useAuthContext } from '../context/AuthContext';
import { BsPlusCircleFill } from 'react-icons/bs';
import Main from '../components/Main';
import Upload from '../components/Upload';

export default function Home() {
  const { user } = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const story_yn = "N";

  return (
    <>
      {!user && <BlurBox />}
      {user && (
        <>
          <Banner />
          <Main user={user} />
          <BsPlusCircleFill
            className="text-7xl fixed bottom-10 right-10 hover:cursor-pointer"
            onClick={() => setShowModal(true)}
          />
        </>
      )}
      {showModal && <Upload setShowModal={setShowModal} user={user} story_yn={story_yn}/>}
    </>
  );
}
