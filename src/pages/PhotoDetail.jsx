import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RiCloseLine } from 'react-icons/ri';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import PhotoDetailDescription from '../components/PhotoDetailDescription';
import { calculateImageSize, getImageName } from '../utils/imageUtils';

export default function PhotoDetail() {
  const navigate = useNavigate();
  const {
    state: { photo, photos },
  } = useLocation();

  const [isVisible, setIsVisible] = useState(true);
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
  }, []);

  const imageSizeStyles = calculateImageSize(imageSize, containerSize);
  const imageSizeClassName =
    imageSizeStyles.width && imageSizeStyles.height ? 'w-full h-full' : '';

  const handleGoBack = () => {
    setIsVisible(false);
    setTimeout(() => {
      navigate(-1);
    }, 500);
  };
  const handleGoPrev = () => {
    const currentIndex = photos.findIndex((p) => p.id === photo.id);
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    navigate(
      `/allPhoto/${photos[prevIndex].category_name}/${getImageName(
        photos[prevIndex].image_url
      )}`,
      {
        state: { photo: photos[prevIndex], photos: photos },
        replace: true, // 기록을 남기지 않도록 설정
      }
    );
  };
  const handleGoNext = () => {
    const currentIndex = photos.findIndex((p) => p.id === photo.id);
    const nextIndex = (currentIndex + 1) % photos.length;
    navigate(
      `/allPhoto/${photos[nextIndex].category_name}/${getImageName(
        photos[nextIndex].image_url
      )}`,
      {
        state: { photo: photos[nextIndex], photos: photos },
        replace: true, // 기록을 남기지 않도록 설정
      }
    );
  };

  return (
    <section
      className={`fixed top-0 left-0 w-full h-full bg-gray-950 bg-opacity-75 flex justify-center items-center z-10 transition-opacity ${
        isVisible ? 'opacity-100 duration-500' : 'opacity-0 duration-500'
      }`}
    >
      <div ref={containerRef} className="flex w-9/12 h-full bg-white">
        <div className="w-4/6 h-full flex justify-center items-center">
          <img
            ref={imgRef}
            src={photo.image_url}
            alt={photo.image_id}
            className={`object-contain ${imageSizeClassName}`}
            style={imageSizeStyles}
          />
          <div className="absolute top-1/2 transform -translate-y-1/2 left-0 text-gray-400 hover:text-white cursor-pointer">
            <IoIosArrowBack onClick={handleGoPrev} size={100} />
          </div>
          <div className="absolute top-1/2 transform -translate-y-1/2 right-0 text-gray-400 hover:text-white cursor-pointer">
            <IoIosArrowForward onClick={handleGoNext} size={100} />
          </div>
        </div>
        <PhotoDetailDescription photo={photo} photos={photos} />
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
