import axios from 'axios';

export async function getTrashImage(uid) {
    console.log('trash 호출')
    return axios.post('http://localhost:4000/api/trash',{ uid })
                .then((res) => res.data.data)
                .catch((error) => console.log("error는 : " + error))
}