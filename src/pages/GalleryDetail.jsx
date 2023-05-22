import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { saveImageDescription, getImageDescription } from '../api/gallery';

export default function StoryDetail() {
  const {
    state: { galleryImages },
  } = useLocation();
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (galleryImages && galleryImages.id) {
      const fetchImageDescription = async () => {
        const descriptionFromDB = await getImageDescription(galleryImages.id);
        setDescription(descriptionFromDB || ''); // 기존에 저장된 설명이 없으면 빈 문자열로 설정
      };
      fetchImageDescription();
    }
  }, [galleryImages]);

  const saveDescription = async () => {
    await saveImageDescription(galleryImages.id, description);
    console.log('이미지 설명이 저장되었습니다.');
    window.location.reload();
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
          <h3 className="font-bold">이미지 설명</h3>
          <p>{galleryImages.description}</p>
        </div>
        <div className="flex items-start mt-4">
          <textarea
            row={1}
            className="w-80 h-22 p-2 border-gray-300 rounded align-self-start"
            placeholder="이미지 설명을 입력하세요..."
            value={description.value}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            className="bg-yellow-300 hover:bg-yellow-500 text-black font-bold mt-2 ml-2 px-2 py-4 rounded align-self-start"
            onClick={saveDescription}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
