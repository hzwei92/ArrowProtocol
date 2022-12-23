const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;
const week = 7 * day;
const month = 30 * day;
const year = 365 * day;

export const getTimeString = (time: number) => {
  const dTime = Math.max(0, Date.now() - time);
  return (
    dTime > year 
    ? (dTime / year).toFixed(0) + 'yr'
    : dTime > month
      ? (dTime / month).toFixed(0) + 'mo'
      : dTime > week 
        ? (dTime / week).toFixed(0) + 'w'
        : dTime > day 
          ? (dTime / day).toFixed(0) + 'd'
          : dTime > hour
            ? (dTime / hour).toFixed(0) + 'h'
            : dTime > minute 
              ? (dTime / minute).toFixed(0) + 'min'
              : 'LIVE!'
  );
};

export const getPolylineCoords = (segmentDist: number, x1: number, y1: number, x2: number, y2: number) => {
  if (
    typeof segmentDist === 'undefined' ||
    typeof x1 === 'undefined' ||
    typeof y1 === 'undefined' || 
    typeof x2 === 'undefined' || 
    typeof y2 === 'undefined'
  ) {
    return ''
  }
  const dist = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow(y2 -y1, 2));

  const segCount = dist / segmentDist;
  const dx = (x2 - x1) / segCount;
  const dy = (y2 - y1) / segCount;

  let str = `${x1},${y1} `;
  let x = x1;
  let y = y1;
  for (let i = 0; i < dist; i+= segmentDist) {
    str += `${x + dx},${y + dy} `
    x += dx;
    y += dy;
  }
  return str
}