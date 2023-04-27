import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RiCloseLine } from 'react-icons/ri';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import PhotoDeatilDescription from '../components/PhotoDeatilDescription';

export default function PhotoDetail() {
  const navigate = useNavigate();
  const {
    state: { photo },
  } = useLocation();

  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const imgRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // 이미지 실제 사이즈 구하기
    if (imgRef.current) {
      const imgWidth = imgRef.current.naturalWidth;
      const imgHeight = imgRef.current.naturalHeight;
      setImageSize({ width: imgWidth, height: imgHeight });
    }
    // 현재 container 사이즈 구하기
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;
      setContainerSize({ width: containerWidth, height: containerHeight });
    }
  }, [imgRef.current, containerRef.current]);

  const imageSizeStyles = calculateImageSize(imageSize, containerSize);
  const imageSizeClassName =
    imageSizeStyles.width && imageSizeStyles.height ? 'w-full h-full' : '';

  const handleGoBack = () => {
    navigate(-1);
  };
  // 개발중
  const handleGoNext = () => {
    //   const nextIndex = photoIndex + 1;
    //   // photos 배열 끝에 도달하면 처음 index로 돌아감
    //   if (nextIndex >= photos.length) {
    //     setPhotoIndex(0);
    //   } else {
    //     setPhotoIndex(nextIndex);
    //   }
    //   // `/allPhoto/${photo.category_name}/${imageName}`
    //   // 다음 Photo의 image_url로 navigate
    //   navigate(
    //   `/allPhoto/${photos[nextIndex].category_name}/${photos[nextIndex].imageName}`
    //   );
  };

  return (
    <section className="fixed top-0 left-0 w-full h-full bg-gray-950 bg-opacity-75 flex justify-center items-center z-10">
      <div ref={containerRef} className="flex w-9/12 h-full bg-white">
        <div className="w-4/6 h-full flex justify-center items-center">
          <img
            ref={imgRef}
            src={photo.image_url}
            className={`object-contain ${imageSizeClassName}`}
            style={imageSizeStyles}
          />
          <div className="absolute top-1/2 transform -translate-y-1/2 left-0 text-gray-400 hover:text-white cursor-pointer">
            <IoIosArrowBack size={100} />
          </div>
          <div className="absolute top-1/2 transform -translate-y-1/2 right-0 text-gray-400 hover:text-white cursor-pointer">
            <IoIosArrowForward onClick={handleGoNext} size={100} />
          </div>
        </div>
        <PhotoDeatilDescription photo={photo} />
      </div>
      <button
        onClick={handleGoBack}
        className="absolute top-0 right-0 m-2 p-2 text-gray-400 hover:text-white"
      >
        <RiCloseLine size={100} />
      </button>
    </section>
  );
}

// 원본 비율 유지하면서 동적으로 스타일 적용하기 위한 함수
function calculateImageSize(imageSize, containerSize) {
  if (
    imageSize.width &&
    imageSize.height &&
    containerSize.width &&
    containerSize.height
  ) {
    const containerRatio = containerSize.width / containerSize.height;
    const imageRatio = imageSize.width / imageSize.height;
    let newWidth, newHeight;
    if (containerRatio > imageRatio) {
      newWidth = containerSize.height * imageRatio;
      newHeight = containerSize.height;
    } else {
      newWidth = containerSize.width;
      newHeight = containerSize.width / imageRatio;
    }
    return { width: newWidth, height: newHeight };
  } else {
    return { width: 0, height: 0 };
  }
}
