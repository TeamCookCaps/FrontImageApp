import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { saveImageDescription, getImageDescription } from '../api/gallery';

export default function StoryDetail() {
  const { state: { galleryImages } = {} } = useLocation();
  const [description, setDescription] = useState('');

  useEffect(() => {
    // 이미지 설명을 DB에서 가져와서 설정
    if (galleryImages && galleryImages.id) {
      const fetchImageDescription = async () => {
        const descriptionFromDB = await getImageDescription(galleryImages.id);
        setDescription(descriptionFromDB || ''); // 기존에 저장된 설명이 없으면 빈 문자열로 설정
      };
      fetchImageDescription();
    }
  }, []);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // 이미지 설명 저장 함수
  const saveDescription = async () => {
    await saveImageDescription(galleryImages.id, description);
    console.log('이미지 설명이 저장되었습니다.');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-full max-h-full">
        <img
          className="h-auto w-auto max-h-full max-w-full rounded-lg"
          src={galleryImages.image_url}
          alt={galleryImages.id}
        />
      </div>
      <div className="mt-4">
      <div className="mt-4">
        <h3 className="font-bold">이미지 설명:</h3>
        <p>{galleryImages.description}</p>
      </div>
        <textarea
          className="w-80 h-24 p-2 border border-gray-300 rounded"
          placeholder="이미지 설명을 입력하세요..."
          value={description}
          onChange={handleDescriptionChange}
        />
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={saveDescription}
        >
          저장
        </button>
      </div>
    </div>
  );
}
