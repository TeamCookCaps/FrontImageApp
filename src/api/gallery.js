import axios from 'axios';

export async function getGalleryImage(uid) {
    console.log('gallery 호출');
    return axios.post('http://localhost:4000/api/gallery',{ uid })
                .then((res) => res.data.data)
                .catch((error) => error)
}