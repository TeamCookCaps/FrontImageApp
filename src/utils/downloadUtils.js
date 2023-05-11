import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import axios from 'axios';
import { getImageName } from './imageUtils';

export async function downloadPhotosAsZip(photos, categoryName) {
  const zip = new JSZip();
  const imagePromises = [];

  // 각 이미지 다운로드 및 Blob 생성
  photos.forEach((photo, index) => {
    const filename = `${
      categoryName === null
        ? `기타_${index + 1}`
        : `${getImageName(photo.image_url)}`
    }.jpg`;
    const imagePromise = fetch(photo.image_url)
      .then((response) => response.blob())
      .then((blob) => {
        zip.file(filename, blob);
      });
    imagePromises.push(imagePromise);
  });

  // 모든 이미지 다운로드 및 압축 파일 생성
  return Promise.all(imagePromises)
    .then(async () => {
      const blob = await zip.generateAsync({ type: 'blob' });
      // 파일 다운로드
      saveAs(blob, `${categoryName === null ? '기타' : categoryName}.zip`);
    })
    .catch((error) => {
      console.error('이미지 다운로드 중 오류가 발생했습니다:', error);
    });
}

export async function downloadPhoto(url) {
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
