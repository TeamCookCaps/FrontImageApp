import React, { useState } from 'react';
import { uploadImage } from '../api/database';
import UploadingModal from './UploadingModal';

export default function Upload({ setShowModal, user: { uid }, story_yn/*: { story_yn }*/ }) {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles && selectedFiles.slice(0, 30));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    uploadImage(uid, files, story_yn) // 이미지 업로드 함수 호출
      .then((res) => {
        console.log(res);
      })
      .finally(() => {
        setIsUploading(false);
        setShowModal(false);
      });
  };

  return (
    <section className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
      {isUploading && <UploadingModal />}
      <div className="w-4/6 h-5/6 overflow-y-auto bg-white rounded-lg p-8 flex flex-col">
        <form onSubmit={handleSubmit} className="flex-grow">
          <h2 className="text-2xl font-bold mb-4">Upload Image</h2>
          {files && (
            <div className="grid grid-cols-5 gap-4 mb-4">
              {files.map((file) => (
                <img
                  src={URL.createObjectURL(file)}
                  className="w-44 h-44 rounded-md object-cover"
                  alt="local file"
                />
              ))}
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            name="file"
            multiple
            required
            onChange={handleChange}
          />
          <div className="flex justify-end mt-4">
            <button
              className="bg-red-400 text-white px-4 py-2 rounded-lg mr-4"
              disabled={isUploading}
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              className="bg-yellow-400 text-white px-4 py-2 rounded-lg"
              disabled={isUploading}
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
