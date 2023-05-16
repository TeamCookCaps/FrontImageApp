import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Main from '../components/Main';
import ChatModal from '../components/ChatModal';
import { useQuery } from '@tanstack/react-query';
import { getGalleryImage } from '../api/gallery';
import GalleryCard from '../components/GalleryCard';

export default function UserPage() {
  const {
    state: { user },
  } = useLocation();  
  console.log(user);
  
  const [showModal, setShowModal] = useState(false);

  const { isLoading, isFetching, error, data : gallery_result } = useQuery(
    ['galleryImage'], () => getGalleryImage(user.uid),
  );

  return (
    <>
      <section className="px-4">
        <div className="flex flex-col items-center space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
          <img
            src={user.profile_img}
            alt={user.nick_name}
            className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start dark:bg-gray-500 dark:border-gray-700"
          />
            <h1 className="text-xl font-semibold md:text-left">
              {user.nick_name}
            </h1>
            <button onClick={() => setShowModal(true)} className='bg-yellow-300 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded'>커미션</button>
        </div>
      </section>
      <Main user={user} />
      <section>
      <h2 className="pb-7 text-3xl font-bold">Gallery</h2>
        <div class=/*"flex space-x-4 overflow-x-auto p-4"*/"flex flex-wrap p-4 -mx-4"> 
            {gallery_result && gallery_result?.map((gallerycard) => (
            <div class="w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 px-4 mb-6">
            <GalleryCard key={gallerycard.image_id} gallerycard={gallerycard}/>
            </div>
            ))}
        </div>
      </section>
      
      {showModal && <ChatModal setShowModal={setShowModal} receiver={user}/>}
    </>
  );
}