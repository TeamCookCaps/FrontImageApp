import axios from 'axios';

export async function signUp(uid, nickname) {
  try {
    // 서버에 데이터 전송
    const response = await axios.post('http://localhost:4000/api/user',
      {
        uuid: uid,
        nick_name:nickname
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
