import dayjs from "dayjs";
import Task from "../models/Task";

export default function getDoneTime(task: Task) {
  const { record } = task;
  let todayTime = 0;
  Object.keys(record).forEach((key) => {
    const time = record[key];
    if (dayjs().isSame(key, "week")) todayTime += time;
  });
  return todayTime;
}
