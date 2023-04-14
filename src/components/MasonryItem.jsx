import React , {useState} from 'react';
import { HiOutlineHeart, HiHeart, HiSearch } from 'react-icons/hi';
import { useAuthContext } from '../context/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { transFavorite } from '../api/favorite';

export default function MasonryItem({ id, search , isShow ,info }) {
  const { uid } = useAuthContext();

  const [like, setLike] = useState(false);
  const [hovered, setHovered] = useState(false);

  const queryClient = useQueryClient();
  const mutation = useMutation(transFavorite, { 
    onSuccess : (data) => {
      if(data === 'like') setLike(true);
      else setLike(false);
    },
    onError : (e)=>{
      alert(e);
    }
  })

  const showDetail = () => {
    isShow(true) 
    info(search)
  }

  const likeImage = () => {
    console.log(id)
    mutation.mutate({ uid : uid ,id : id});
  }

  return (
    <div className='relative w-full p-3'>
      <div className='w-full overflow-hidden rounded-md'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
          <ul className='absolute top-5 right-4 text-3xl'>
            <li>
              {!like &&  
                <HiOutlineHeart className="text-gray-500"
                      onClick={likeImage}/>}
              {like && 
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
