import axios from 'axios';

export async function uploadImage(uid, files) {
  try {
    const formData = new FormData();
    formData.append('uid', uid);
    for (let i = 0; i < files.length; i++) {
      const fileJson = JSON.stringify(files[i]);
      const blob = new Blob([fileJson], { type: 'application/json' });
      formData.append('files', blob);
    }

    // console에서 데이터 확인용
    for (let datas of formData) {
      console.log(datas);
    }

    // 서버에 데이터 전송
    const response = await axios.post(
      'http://localhost:3000/api/upload',
      formData
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
