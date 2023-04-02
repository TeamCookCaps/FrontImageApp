import axios from 'axios';

export async function search(word,color) {
    console.log('호출 확인')
    return axios.post('http://localhost:4000/api/search',{ word : word, color:color })
                .then((res) => res.data.data)
                .catch((error) => error)
}
