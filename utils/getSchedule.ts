import Task from "../models/Task";
import Schedule from "../types/Schedule";
import getTimeRemaining from "./getTimeRemaining";

/**
 * Runs through the tasks and returns a list of tasks with time remaining for the
 * week
 * @returns
 */
export default function getSchedule(tasks: Task[]) {
  const schedule: Schedule[] = [];
  tasks.forEach((task) => {
    const { record = {} } = task;
    const { timeRemaining, doneToday, doneThisWeek } = getTimeRemaining(task);
    schedule.push({
      ...task,
      record,
      timeRemaining,
      doneToday,
      doneThisWeek,
      status: "ungrouped",
      todayTime: 0,
      overflow: false,
    });
  });
  return schedule;
}
