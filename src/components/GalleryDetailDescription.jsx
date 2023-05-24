import React, { useState } from 'react';
import { saveImageDescription } from '../api/gallery';
import { HiPencilAlt } from 'react-icons/hi';

export default function GalleryDetailDescription({
  description,
  setDescription,
  galleryImage: { id },
}) {
  const [text, setText] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const saveDescription = () => {
    saveImageDescription(id, text) //
      .then(() => {
        setDescription(text);
        setText('');
        setIsEdit(false);
      });
  };
  const handleIsEdit = () => {
    setIsEdit(!isEdit);
    if (!isEdit) {
      setText(description);
    }
  };

  return (
    <div className="w-2/6 h-full flex flex-col justify-center bg-gray-100 p-8">
      <h2 className="text-yellow-500 font-bold text-4xl mb-6">Description</h2>
      <div className="flex items-center text-2xl mb-6 gap-2">
        <p className="font-medium">{description}</p>
        <HiPencilAlt className="cursor-pointer" onClick={handleIsEdit} />
      </div>
      {isEdit && (
        <div className="flex">
          <textarea
            className="resize-none w-full rounded-lg px-4 py-2 focus:outline-none mr-4"
            placeholder="이미지 설명을 입력하세요..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-600 whitespace-nowrap"
            onClick={saveDescription}
          >
            저장
          </button>
        </div>
      )}
    </div>
  );
}
