import React, { useState } from 'react';
import GalleryCard from '../components/GalleryCard';
import { useAuthContext } from '../context/AuthContext';
import { BsPlusCircleFill } from 'react-icons/bs';
import Upload from '../components/Upload';
import { getGalleryImage } from '../api/gallery';
import { useQuery } from '@tanstack/react-query';
import Loading from '../components/Loading';


export default function Gallery() {
  const { user } = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const gallery_yn = "Y";

  const { isLoading, isFetching, error, data : result } = useQuery(
    ['galleryImage'], () => getGalleryImage(user.uid),
  );

  /*if(isLoading || isFetching){
    return (
      <>
        <Loading/>
      </>
    )
  }*/

  if(error) {
    return (<div>에러가 발생했습니다 : {error}</div>)
  }

  return (
	<>
	<div class=/*"flex space-x-4 overflow-x-auto p-4"*/"flex flex-wrap p-4 -mx-4"> 
		{result && result?.map((gallerycard) => (
      <div class="w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 px-4 mb-6">
      <GalleryCard key={gallerycard.image_id} gallerycard={gallerycard}/>
      </div>
    ))}
	</div>
	
	<BsPlusCircleFill className="text-7xl fixed bottom-10 right-10 hover:cursor-pointer"
	onClick={() => setShowModal(true)}
	/>
	{showModal && <Upload setShowModal={setShowModal} user={user} gallery_yn={gallery_yn}/>}
	</>
  );
}