export function getImageName(url) {
  const imageName = url?.substring(
    url.lastIndexOf('/') + 1,
    url.lastIndexOf('.')
  );
  return imageName;
}

// 원본 비율 유지하면서 동적으로 스타일 적용하기 위한 함수
export function calculateImageSize(imageSize, containerSize) {
  if (
    imageSize.width &&
    imageSize.height &&
    containerSize.width &&
    containerSize.height
  ) {
    const containerRatio = containerSize.width / containerSize.height;
    const imageRatio = imageSize.width / imageSize.height;
    let newWidth, newHeight;
    if (containerRatio > imageRatio) {
      newWidth = containerSize.height * imageRatio;
      newHeight = containerSize.height;
    } else {
      newWidth = containerSize.width;
      newHeight = containerSize.width / imageRatio;
    }
    return { width: newWidth, height: newHeight };
  } else {
    return { width: 0, height: 0 };
  }
}
