import dayjs from "dayjs";

/**
 * Used to generate a uniform date key for the current date and time. the format
 * is also easy to convert back into date and time object. It should be used to
 * keep record of any data for a particular date and time.
 * @returns
 */
export default function getDateTimeKey() {
  return dayjs().format("YYYY-MM-DDTHH:mm:ssZ");
}
