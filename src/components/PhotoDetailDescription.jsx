import React, { useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import { FcLike, FcDislike } from 'react-icons/fc';
import { AiFillDelete } from 'react-icons/ai';
import { removeOneImage } from '../api/trash';
import { useAuthContext } from '../context/AuthContext';
import { useLike } from '../hook/useLike';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lottie from 'react-lottie';
import animationData from '../lotties/heart-fav.json';
import { downloadPhoto } from '../utils/downloadUtils';
import { getDate } from '../utils/dateUtils';
import { getImageName } from '../utils/imageUtils';
import { useEffect } from 'react';

export default function PhotoDetailDescription({
  photo: {
    uid,
    image_id,
    image_width,
    image_height,
    image_date,
    image_location,
    parent_name,
    category_name,
    image_url,
    favorite_yn,
    delete_yn,
  },
  photos,
}) {
  const { user } = useAuthContext();
  const [isAnimated, setIsAnimated] = useState(false);
  const [like, setLike] = useState(() => {
    return favorite_yn || localStorage.getItem(`photo-${image_id}`);
  });
  const updateKey = `photo-${image_id}`;
  const updateDeleteKey = `photo-deleted-${image_id}`;
  const { mutate } = useLike(updateKey);
  const result_date = new Date(image_date).toString();
  const navigate = useNavigate();

  // 하트 애니메이션
  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  useEffect(() => {
    setLike(favorite_yn)
  }, []);
  console.log("favorite_yn : " + favorite_yn);
  console.log("local? : " + localStorage.getItem(`photo-${image_id}`))

  const handleLikeClick = () => {
    const newLike = like === 'y' ? 'n' : 'y';
    setLike(newLike);
    localStorage.setItem(updateKey, newLike);
    mutate({ uid: user?.uid, id: image_id });

    if (newLike === 'y' && !isAnimated) {
      setIsAnimated(true);
      setTimeout(() => {
        setIsAnimated(false);
      }, 1000);
    }
  };
  const handleDelete = async () => {
    try {
      await removeOneImage(user.uid, image_id);

      // 삭제 완료 알람 띄우기
      toast.success('사진이 삭제되었습니다!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });

      const newDelete = delete_yn === 'y' ? 'n' : 'y';
      localStorage.setItem(updateDeleteKey, newDelete);

      const updatedPhotos = photos.filter((p) => p.image_id !== image_id);
      // 사진이 한장도 남아있지 않다면 이전 페이지로 이동
      if (updatedPhotos.length === 0) {
        navigate(-1);
        return;
      }
      const currentIndex = updatedPhotos.findIndex(
        (p) => p.image_id === image_id
      );
      const nextIndex = (currentIndex + 1) % updatedPhotos.length;

      navigate(
        `/allPhoto/${updatedPhotos[nextIndex].category_name}/${getImageName(
          updatedPhotos[nextIndex].image_url
        )}`,
        {
          state: { photo: updatedPhotos[nextIndex], photos: updatedPhotos },
          replace: true, // 기록을 남기지 않도록 설정
        }
      );
    } catch (error) {
      toast.error('삭제 도중 오류가 났습니다!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      console.error(error);
    }
  };

  return (
    <div className="w-2/6 h-full flex flex-col justify-center items-center m-4">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={true}
        pauseOnHover={false}
      />
      <div className="text-center text-3xl">
        <h2 className="text-4xl font-bold pb-5">
          {category_name ? `${category_name}` : '기타'}
        </h2>
        <p className="text-gray-600 pb-4">width : {image_width}</p>
        <p className="text-gray-600 pb-4">height : {image_height}</p>
        <p className="text-gray-600 pb-4">
          업로드 날짜 : {getDate(result_date)}
        </p>
        {image_location && (
          <p className="text-gray-600 pb-4">위치 : {image_location}</p>
        )}
      </div>
      <div className="flex flex-wrap justify-center mt-5 gap-5 text-2xl">
        {isAnimated && (
          <div className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2">
            <Lottie options={defaultOptions} height={1000} width={1000} />
          </div>
        )}
        {like === 'n' ? (
          <button
            onClick={handleLikeClick}
            className="bg-red-300 text-white px-4 py-3 rounded-lg flex items-center space-x-2 whitespace-nowrap"
          >
            <FcLike />
            <span>좋아요</span>
          </button>
        ) : (
          <button
            onClick={handleLikeClick}
            className="bg-red-300 text-white px-4 py-3 rounded-lg flex items-center space-x-2 whitespace-nowrap"
          >
            <FcDislike />
            <span>취소</span>
          </button>
        )}
        {(uid == user?.uid) && (<button
          className="bg-gray-500 text-white px-4 py-3 rounded-lg flex items-center space-x-2 whitespace-nowrap"
          onClick={handleDelete}
        >
          <AiFillDelete />
          <span>삭제</span>
        </button>)}
        <button
          className="bg-yellow-300 text-white px-4 py-3 rounded-lg flex items-center space-x-2 whitespace-nowrap"
          onClick={() => {
            downloadPhoto(image_url);
          }}
        >
          <FiDownload />
          <span>다운로드</span>
        </button>
      </div>
    </div>
  );
}
