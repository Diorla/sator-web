import dayjs from "dayjs";

export default function getUserTime(weeklyQuota: number[]) {
  const today = dayjs().day();
  const todayTime = weeklyQuota[today];
  const thisWeekTime = weeklyQuota.reduce((acc, curr) => acc + curr, 0);

  const remainingWeekTime = weeklyQuota
    .filter((_item, idx) => idx > today)
    .reduce((acc, curr) => acc + curr, 0);

  return {
    todayTime,
    thisWeekTime,
    remainingWeekTime,
    daysRemaining: 7 - today,
  };
}
