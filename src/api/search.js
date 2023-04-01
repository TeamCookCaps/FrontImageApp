import axios from 'axios';

export async function search(word) {
    console.log('호출 확인')
    return axios.post('http://localhost:4000/api/search',{ word : word })
                .then((res) => res.data.data)
                .catch((error) => error)
}
