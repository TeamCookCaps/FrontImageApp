import axios from 'axios';

export async function getRecommandImage(uid) {
    console.log('recommand 호출')
    return axios.post('http://localhost:4000/api/recommand',{ uid })
                .then((res) => res.data.data)
                .catch((error) => console.log("error는 : " + error))
}