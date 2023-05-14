import React from 'react';
import RemoveAllPhoto from '../components/RemoveAllPhoto';
import RestoreAllPhoto from '../components/RestoreAllPhoto';
import { useQuery } from '@tanstack/react-query';
import { getTrashImage } from '../api/trash';
import { useAuthContext } from '../context/AuthContext';
import Loading from '../components/Loading';
import TrashModal from '../components/TrashModal';
import { useState } from 'react';
import { set } from 'firebase/database';


export default function Trash() {
  const { user } = useAuthContext();

  const { isLoading, isFetching, error, data : result } = useQuery(['trashImage'], () => getTrashImage(user.uid));
  
  const trashId = result?.map((image) => image?.id)
  const trashNameList = result?.map((image) => image?.image_url.substring(image?.image_url.lastIndexOf('/')+1).split('.')[0])
  //console.log(trashNameList)
  // var url  = require('url');
  // var urlObject  = url.parse('https://res.cloudinary.com/du2iwfybr/image/upload/v1681375757/xflqoikpefnfmrcckf6n.jpg');
  // console.log(urlObject);
  //const trashImgName = trashURL?.map((url) => )
  // console.log("trashList : " + trashList)
  const [modalState, setModalState] = useState(() => false)
  const [selectImage, setSelectImage] = useState([])
  console.log("state : " + modalState)

  if(isLoading || isFetching){
    return (
      <>
        <Loading/>
      </>
    )
  }

  if(error) {
    return (<div>에러가 발생했습니다 : {error}</div>)
  }

  return (
    <>
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-0 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-black justify-start">휴지통</h2>
        <div className="space-x-2 flex justify-end">
          <RestoreAllPhoto trashId={trashId} />
          <RemoveAllPhoto trashId={trashId} trashNameList={trashNameList} />
        </div>
        <div className="mt-6 grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-4 lg:grid-cols-8 xl:gap-x-2">
          {result && result?.map((trashImg) => (
            <div key={trashImg?.id} className="group relative">
              
              <div className='lg:w-full lg:h-full'>
                
            <button onClick={() => {setModalState(true); setSelectImage(trashImg);}}>
                <img
                  src={trashImg?.image_url}
                  alt="image"
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
                
              </button>
              </div>
            </div>
          
          ))}
          
          <TrashModal isOpen={modalState} setIsOpen={setModalState} trashImageInfo={selectImage}/>
        </div>
      </div>
    </div>
    </>
  )
}
