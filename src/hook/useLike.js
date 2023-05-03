import { useMutation, useQueryClient } from '@tanstack/react-query'
import { transFavorite } from '../api/favorite';


export const useLike = (updateKey) => {   
    const queryClient = useQueryClient();
    return useMutation(transFavorite, { 
        onSettled : (data) => {
            queryClient.invalidateQueries(updateKey); //search 페이지에서 data 로 불러옴 
        },
        onError : (e)=>{
            alert(e);
        },
    })
};