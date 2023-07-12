/**
 * Converts minutes to an array of hours and minutes e.g. 80 minutes becomes
 * [1, 20]
 * @param value The minutes
 * @returns [hours, minutes]
 */
export default function minuteToArr(value: number) {
  const mm = value % 60;
  const hh = (value - mm) / 60;
  const hour = Number.isNaN(hh) ? 0 : hh;
  const minute = Number.isNaN(mm) ? 0 : mm;
  return [hour, minute];
}
