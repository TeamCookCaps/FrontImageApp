import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getImageName } from '../utils/imageUtils';
import { getImageDescription } from '../api/gallery';

export default function GalleryCard({ galleryImage }) {
  const navigate = useNavigate();
  const [isTallImage, setIsTallImage] = useState(false);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const image = new Image();
    image.src = galleryImage.image_url;
    image.onload = () => {
      const aspectRatio = image.width / image.height;
      setIsTallImage(aspectRatio > 1); // 세로 길이가 더 긴 이미지인지 확인
    };

    // 이미지 설명을 가져오는 API 호출
    getImageDescription(galleryImage.id) //
      .then((response) => {
        setDescription(response[0].description);
      });
  }, [galleryImage]);

  const handleNavigate = () => {
    navigate(`/gallery/${getImageName(galleryImage.image_url)}`, {
      state: { galleryImage },
    });
  };

  return (
    <div className="group relative h-60 w-60 md:w-72 md:h-72 lg:w-80 lg:h-80">
      <img
        className="
          cursor-pointer
          object-cover
          rounded-2xl
          transition
          delay-300
          w-full
          h-full
          shadow-lg
          group-hover:opacity-90
          sm:group-hover:opacity-0
        "
        src={galleryImage.image_url}
        alt={galleryImage.id}
        onClick={handleNavigate}
      />
      <div
        className={`
          opacity-0
          absolute
          top-0
          transition
          delay-300
          duration-200
          z-10
          invisible
          sm:visible
          w-full
          scale-0
          group-hover:${isTallImage ? 'scale-150' : 'scale-125'}
          group-hover:opacity-100
          ${!isTallImage && 'group-hover:-translate-y-[5vw]'}
        `}
      >
        <img
          className="
            cursor-pointer
            object-cover
            transition
            duration
            shadow-lg
            rounded-t-md
            w-full
            h-full
          "
          src={galleryImage.image_url}
          alt={galleryImage.id}
          onClick={handleNavigate}
        />
        <div
          className="
            z-10
            bg-zinc-800
            p-2
            lg:p-4
            absolute
            w-full
            transition
            shadow-md
            rounded-b-md
          "
        >
          <div className="flex flex-col gap-3">
            <h2 className="text-yellow-300 font-bold text-xl">Description</h2>
            <span className="text-white">
              {description ? description : '이미지 설명 없음'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
