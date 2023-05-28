import axios from 'axios';

export async function transFavorite({ uid, id }) {
  return axios
    .post('http://localhost:4000/api/favorite', { uid: uid, id: id })
    .then((res) => res.data)
    .catch((error) => console.log(error));
}

export async function getFavoriteImages(uid) {
  return axios
    .post('http://localhost:4000/api/favoriteImages', { uid })
    .then((res) => res.data.data)
    .catch((error) => console.log(error));
}