import axios from 'axios';

export async function uploadImage(uid, files) {
  try {
    const formData = new FormData();
    formData.append('uid', uid);
    for (let i = 0; i < files.length; i++) {
      formData.append('file_list', files[i]);
    }

    // console에서 데이터 확인용
    for (let datas of formData) {
      console.log(datas);
    }

    // 서버에 데이터 전송
    const response = await axios.post(
      'http://localhost:8082/api/image_upload',
      formData
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getImageinfo() {
  return axios
    .get('http://localhost:3001/api/image_upload')
    .then((res) => res.data)
    .catch((error) => console.log(error));
}
