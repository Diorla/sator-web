/**
 * Converts an array of [hour, minute] to a minutes
 * @param value [hour, minute]
 * @returns number
 */
export default function arrToMinute(value: [number, number]) {
  const [hour, minute] = value;
  const totalMinute = hour * 60 + minute;
  if (hour < 0 || minute < 0) return 0;
  return Number.isNaN(totalMinute) ? 0 : totalMinute;
}
