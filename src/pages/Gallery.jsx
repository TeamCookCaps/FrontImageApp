import React, { useState } from 'react';
import GalleryCard from '../components/GalleryCard';
import { useAuthContext } from '../context/AuthContext';
import { BsPlusCircleFill } from 'react-icons/bs';
import Upload from '../components/Upload';
import { getGalleryImage } from '../api/gallery';
import { useQuery } from '@tanstack/react-query';
import Loading from '../components/Loading';
import Masonry from 'react-masonry-css';



export default function Gallery() {
  const { user } = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const gallery_yn = "Y";

  const { isLoading, isFetching, error, data : galleryImages } = useQuery(
    ['galleryImages'], () => getGalleryImage(user.uid),
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
  <Masonry
        className="flex animate-slide-fwd"
        breakpointCols={{
          default: 3,
          1300: 2,
          900: 1
        }}
      >
		{galleryImages && galleryImages?.map((galleryImages) => (
      <div class="w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 px-4 mb-6">
      <GalleryCard key={galleryImages.image_id} galleryImages={galleryImages}/>
      </div>
    ))}
	</Masonry>
	
	<BsPlusCircleFill className="text-7xl fixed bottom-10 right-10 hover:cursor-pointer"
	onClick={() => setShowModal(true)}
	/>
	{showModal && <Upload setShowModal={setShowModal} user={user} gallery_yn={gallery_yn}/>}
	</>
  );
}