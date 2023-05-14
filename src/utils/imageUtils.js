export function getImageName(url) {
  const imageName = url?.substring(
    url.lastIndexOf('/') + 1,
    url.lastIndexOf('.')
  );
  return imageName;
}
