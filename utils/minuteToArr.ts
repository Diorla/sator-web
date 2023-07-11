/**
 * Converts minutes to an array of hours and minutes e.g. 80 minutes becomes
 * [1, 20]
 * @param value The minutes
 * @returns [hours, minutes]
 */
export default function minuteToArr(value: number) {
  const minute = value % 60;
  const hour = (value - minute) / 60;
  return [hour, minute];
}
