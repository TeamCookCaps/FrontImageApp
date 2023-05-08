import React, { useState } from 'react';
import StoryCard from '../components/StoryCard';
import { useAuthContext } from '../context/AuthContext';
import { BsPlusCircleFill } from 'react-icons/bs';
import Upload from '../components/Upload';
import { getStoryImage } from '../api/story';
import { useQuery } from '@tanstack/react-query';
import Loading from '../components/Loading';


export default function Story() {
  const { user } = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const story_yn = "Y";

  const { isLoading, isFetching, error, data : result } = useQuery(
    ['storyImage'], () => getStoryImage(user.uid),
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
	<div class="flex space-x-4 overflow-x-auto p-4">
		{result && result?.map((storycard) => (
      <StoryCard key={storycard.image_id} storycard={storycard}/>
    ))}
	</div>
	
	<BsPlusCircleFill className="text-7xl fixed bottom-10 right-10 hover:cursor-pointer"
	onClick={() => setShowModal(true)}
	/>
	{showModal && <Upload setShowModal={setShowModal} user={user} story_yn={story_yn}/>}
	</>
  );
}