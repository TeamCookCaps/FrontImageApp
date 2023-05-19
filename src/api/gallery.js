import axios from 'axios';

export async function getGalleryImage(uid) {
    return axios.post('http://localhost:4000/api/gallery',{ uid })
                .then((res) => res.data.data)
                .catch((error) => error)
}

export async function saveImageDescription(id, description) {
    return axios.post('http://localhost:4000/api/saveDescription',{ id, description })
                .then((res) => res.data.data)
                .catch((error) => error)
}

export async function getImageDescription(id) {
    return axios.post('http://localhost:4000/api/getDescription',{ id })
                .then((res) => res.data.data)
                .catch((error) => error)
}