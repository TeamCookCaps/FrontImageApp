import React , {useState} from 'react';
import { HiOutlineHeart, HiHeart, HiSearch } from 'react-icons/hi';
import { useAuthContext } from '../context/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { transFavorite } from '../api/favorite';

export default function MasonryItem({ search, isShow ,info }) {
  const { user } = useAuthContext();
  const id  = search.id;
  const favorite_yn = search.favorite_yn;


  const [like, setLike] = useState(favorite_yn);
  const [hovered, setHovered] = useState(false);

  const queryClient = useQueryClient();
  const mutation = useMutation(transFavorite, { 
    onSettled : (data) => {
      console.log(data.data === "like");
      if(data.data === "like") setLike((data) => data = 'y');
      else setLike((data) => data = 'n');
      queryClient.invalidateQueries('data');
    },
    onError : (e)=>{
      alert(e);
    },
  })

  const showDetail = () => {
    isShow(true) 
    info(search)
  }

  const likeImage = () => {
    mutation.mutate({ uid : user?.uid ,id : id});
  }

  return (
    <div className='relative w-full p-3'>
      <div className='w-full overflow-hidden rounded-md'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
          <ul className='absolute top-5 right-4 text-3xl'>
            <li>
              {like === 'n' ? 
                <HiOutlineHeart className="text-gray-500"
                      onClick={likeImage}/> : 
                <HiHeart className="text-red-400"
                      onClick={likeImage} />}
            </li>
            <li>
              {hovered && <HiSearch className='text-gray-500' onClick={showDetail}/>}
            </li>
          </ul>
          
          <img 
              className={`h-full w-full object-cover object-center lg:h-full lg:w-full ${hovered ? 'scale-95' : 'scale-100' }hover:cursor-pointer hover:ease-out`}
              src={search?.image_url}
              alt={search?.id}
              />
          
      </div>
    </div>
  );
}
