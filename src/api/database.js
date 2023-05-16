import axios from 'axios';

export async function uploadImage(uid, files, gallery_yn) {
  try {
    const formData = new FormData();
    formData.append('uid', uid);
    for (let i = 0; i < files.length; i++) {
      formData.append('file_list', files[i]);
    }
    formData.append('gallery_yn', gallery_yn);

    // console에서 데이터 확인용
    for (let datas of formData) {
      console.log(datas);
    }

    // 서버에 데이터 전송 => ImageClassification
    const response = await axios.post(
      'http://localhost:8082/api/image_upload',
      formData
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function signUp(uid, nickname, profile_img) {
  try {
    // 서버에 데이터 전송
    const response = await axios.post('http://localhost:4000/api/user', {
      uuid: uid,
      nick_name: nickname,
      profile_img : profile_img,
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

export async function getImageinfo(uid) {
  return axios
    .post('http://localhost:4000/api/imageInfo', { uid })
    .then((res) => res.data.data)
    .catch((error) => console.log(error));
}
