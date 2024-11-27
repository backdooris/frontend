export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
}

export function convertToDateObj(yyyyMMdd: string) {
  if (yyyyMMdd.length !== 8) return new Date(NaN);
  const year = parseInt(yyyyMMdd.substring(0, 4), 10);
  const month = parseInt(yyyyMMdd.substring(4, 6), 10) - 1;
  const day = parseInt(yyyyMMdd.substring(6, 8), 10);
  return new Date(year, month, day);
}


// function parseYYYYmmDD(yyyymmdd: string) {
//   console.log(yyyymmdd);
//   const year = yyyymmdd.substring(0, 4);
//   const month = yyyymmdd.substring(4, 6);
//   const date = yyyymmdd.substring(6, 8);
//   return { year, month, date };
// }
