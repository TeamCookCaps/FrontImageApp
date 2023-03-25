export async function uploadImage(files) {
  // cloundinary에 이미지 올리고 url리턴해주는 함수(임시)
  const data = new FormData();
  const urls = [];

  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    data.append('file', file);
    data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);

    const res = await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
      method: 'POST',
      body: data,
    });
    const result = await res.json();
    urls.push(result.url);
  }

  return urls;
}
