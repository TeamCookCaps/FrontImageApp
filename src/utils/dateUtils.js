export function getDate(date_str) {
  const date = new Date(date_str);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minites = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return (
    date.getFullYear().toString() +
    '-' +
    month +
    '-' +
    day +
    ' ' +
    hour +
    ':' +
    minites +
    ':' +
    seconds
  );
}
