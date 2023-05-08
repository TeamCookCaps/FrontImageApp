import axios from 'axios';

export async function getStoryImage(uid) {
    console.log('story 호출');
    return axios.post('http://localhost:4000/api/story',{ uid })
                .then((res) => res.data.data)
                .catch((error) => error)
}