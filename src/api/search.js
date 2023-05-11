import axios from 'axios';

export async function search(uid, word, color) {
  return axios
    .get(`http://localhost:4000/api/search`, {
      params: { uid: uid, word: word, color: color },
    })
    .then((res) => res.data.data)
    .catch((error) => error);
}
