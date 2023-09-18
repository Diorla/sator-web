import dayjs from "dayjs";
import Task from "../models/Task";

/**
 * Used to determine the time remaining for a task, this is done by subtracting
 * the minutes done for that week from the total minutes of the task.
 * Also, I need to take account the time the task was created. A task created
 * on Friday, with a weekly quota of 24 hours can't possibly be done using
 * the entire week quota (calculate using days remaining)
 * @param task The particular task
 * @returns
 */
export default function getTimeRemaining(task: Task) {
  const { record = {} } = task;
  const doneTimes = Object.keys(record).map((item) => {
    return {
      date: record[item].date,
      length: record[item].length,
    };
  });

  // Remove the times that are done this week, but not today
  const doneThisWeek = doneTimes
    .filter(
      (item) =>
        dayjs().isSame(dayjs(item.date), "week") &&
        !dayjs().isSame(dayjs(item.date), "date")
    )
    .reduce((acc, item) => {
      return (acc += item.length);
    }, 0);

  const doneToday = doneTimes
    .filter((item) => dayjs().isSame(dayjs(item.date), "date"))
    .reduce((acc, item) => {
      return (acc += item.length);
    }, 0);

  const timeRemaining = task.weeklyQuota - doneThisWeek;

  return {
    doneToday,
    timeRemaining,
    doneThisWeek,
  };
}
