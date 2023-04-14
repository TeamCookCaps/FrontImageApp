import { useMutation, useQueryClient } from '@tanstack/react-query'
import { transFavorite } from '../api/favorite';


export const useLike = () => {   
    const queryClient = useQueryClient();
    return useMutation(transFavorite, { 
        onSettled : (data) => {
            // if(data.data === "like") setLike((data) => data = 'y');
            // else setLike((data) => data = 'n');
            queryClient.invalidateQueries('data');
            
        },
        onError : (e)=>{
            alert(e);
        },
    })
};