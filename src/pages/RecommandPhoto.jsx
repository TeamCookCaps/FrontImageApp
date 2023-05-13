import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRecommandImage } from '../api/recommand';
import { useAuthContext } from '../context/AuthContext';
import { downloadPhoto } from '../utils/downloadUtils';

export default function RecommandPhoto() {

  const { user } = useAuthContext();
  
  const { isLoading, isFetching, error, data : result } = useQuery(['recommandImage'], () => getRecommandImage(user.uid));

  return (
    <div className="bg-white">
    
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-0 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-black justify-start">배경사진 추천</h2>
        <div className="space-x-2 flex justify-end">
        </div>
        <div className="mt-6 grid grid-rows-1 gap-y-10 gap-x-6 sm:grid-rows-2 lg:grid-rows-4 xl:gap-x-8">
          {result && result?.map((recommand) => (
            <div key={recommand.id} className="group relative">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:aspect-none lg:w-full lg:h-100">
                <button className="h-full w-full object-cover object-center lg:h-full lg:w-full" onClick={() => downloadPhoto(recommand?.image_url)}>
                <img
                  src={recommand.image_url}
                  alt="recommandImage"
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
                </button>
              </div>
              <div className="mt-0 flex justify-end mr-2">
                <p className="mt-1 text-base text-gray-500">{recommand.image_width} x {recommand.image_height}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
