// 指定した日付の週の日曜日の日付を返す
export const getSunday = (date: Date): Date => {
  const day = date.getDay(); // 0:日曜, 1:月曜, ...
  const sunday = new Date(date);
  sunday.setDate(date.getDate() - day);
  sunday.setHours(0, 0, 0, 0); // 0時0分0秒にリセット
  return sunday;
}

// 本日週の日曜日付を取得
export const getCurrentWeekSunday = (): Date => {
  return getSunday(new Date());
}
