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
export default function getTimeRemaining(task: Task, activeDays: number[]) {
  const { record } = task;
  const doneTimes = Object.keys(record);

  // Remove the times that are done this week, but not today
  const doneThisWeek = doneTimes.filter(
    (time) =>
      dayjs().isSame(dayjs(time), "week") &&
      !dayjs().isSame(dayjs(time), "date")
  );

  const doneThisWeekTime = doneThisWeek.reduce((acc, time) => {
    return (acc += record[time]);
  }, 0);

  const daysBeforeCreation = [];
  const daysRemaining = [];
  activeDays.forEach((day) => {
    if (day >= dayjs().day()) {
      daysRemaining.push(day);

      if (
        dayjs().isSame(task.createdAt, "week") &&
        dayjs(task.createdAt).isAfter(dayjs().day(day), "day")
      ) {
        daysBeforeCreation.push(day);
      }
    }
  });

  const typicalDailyQuota = task.weeklyQuota / activeDays.length;
  const currentDaysLength = activeDays.length - daysBeforeCreation.length;

  const currentWeekQuota = typicalDailyQuota * currentDaysLength;

  const currentWeekRemaining = currentWeekQuota - doneThisWeekTime;

  const doneToday = doneTimes
    .filter((time) => dayjs().isSame(time, "date"))
    .reduce((acc, time) => {
      return (acc += record[time]);
    }, 0);

  return {
    doneToday,
    timeRemaining: currentWeekRemaining,
    daysRemaining: daysRemaining.length,
    doneThisWeek: doneThisWeekTime,
  };
}
