import axios from 'axios';

export async function transFavorite({uid ,id}) {
    return axios
      .post('http://localhost:4000/api/favorite', { uid : uid , id :id })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  }