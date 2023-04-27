import axios from 'axios';

export async function getTrashImage(uid) {
  console.log('trash 호출');
  return axios
    .post('http://localhost:4000/api/trash', { uid })
    .then((res) => res.data.data)
    .catch((error) => console.log('error는 : ' + error));
}

export async function removeAllImage(trashId) {
  console.log('removeAll 호출');
  return axios
    .post('http://localhost:4000/api/removeAll', { trashId })
    .then((res) => res.data.data)
    .catch((error) => console.log('error는 : ' + error));
}

export async function removeCloudinary(img_url) {
  console.log('removeCloudinary 호출');
  return axios
    .post('http://localhost:8082/api/image_Remove', { img_url })
    .then((res) => res.data.data)
    .catch((error) => console.log('error는 : ' + error));
}

export async function restoreAllImage(trashId) {
  console.log('restoreAll 호출');
  // 고쳐야함
  return axios
    .post('http://localhost:4000/api/restoreAll', { trashId })
    .then((res) => res.data.data)
    .catch((error) => console.log('error는 : ' + error));
}

export async function removeOneImage(uid, trashId) {
  console.log('removeOneImage 호출');
  return axios
    .post('http://localhost:4000/api/delete', { uid, trashId })
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
}
