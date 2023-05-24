import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getImageDescription } from '../api/gallery';
import { RiCloseLine } from 'react-icons/ri';
import GalleryDetailDescription from '../components/GalleryDetailDescription';
import { calculateImageSize } from '../utils/imageUtils';

export default function GalleryDetail() {
  const navigate = useNavigate();
  const {
    state: { galleryImage },
  } = useLocation();
  const [description, setDescription] = useState('');

  const [isVisible, setIsVisible] = useState(true);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    getImageDescription(galleryImage.id) //
      .then((response) => {
        setDescription(response[0].description);
      });
  }, [galleryImage]);

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
            src={galleryImage.image_url}
            alt={galleryImage.id}
            className={`object-contain ${imageSizeClassName}`}
            style={imageSizeStyles}
          />
        </div>
        <GalleryDetailDescription
          galleryImage={galleryImage}
          description={description}
          setDescription={setDescription}
        />
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
