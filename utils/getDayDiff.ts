import dayjs from "dayjs";

export default function getDaysDiff(date: string): number {
  const today = dayjs();
  const dateToCheck = dayjs(date);
  return today.diff(dateToCheck, "day");
}
