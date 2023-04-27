import axios from 'axios';

export async function search(uid, word, color) {
  return axios
    .get(`http://localhost:4000/api/search`, {
      params: { uid: uid, word: word, color: color },
    })
    .then((res) => res.data.data)
    .catch((error) => error);
}

export async function downloadFile(url) {
  console.log('파일 다운로드 함수 호출');
  return axios
    .get(url, { responseType: 'blob' })
    .then((res) => {
      let result = { url: res.request?.responseURL, blob: res.data };
      return result;
    })
    .then((result) => {
      const url = window.URL.createObjectURL(result.blob);

      const aElement = document.createElement('a');
      document.body.appendChild(aElement);
      aElement.href = url;
      aElement.download = result.url.match(/\/([^/]+\.\w{3,4})$/)[1];

      aElement.click();
      setTimeout((_) => {
        window.URL.revokeObjectURL(url);
      }, 60000);
      aElement.remove();
      window.URL.revokeObjectUrl(url);
    })
    .catch((error) => error);
}
