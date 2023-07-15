import Task from "../models/Task";
import getTimeRemaining from "./getTimeRemaining";

export type Schedule = Task & {
  timeRemaining: number;
  todayTime: number;
  overflow: boolean;
  daysRemaining: number;
  status: "completed" | "uncompleted" | "archived" | "ungrouped";
  doneToday: number;
  doneThisWeek: number;
};

/**
 * Runs through the tasks and returns a list of tasks with time remaining for the
 * week
 * @returns
 */
export default function getSchedule(tasks: Task[], activeDays: number[]) {
  const schedule: Schedule[] = [];
  tasks.forEach((task) => {
    const { timeRemaining, daysRemaining, doneToday, doneThisWeek } =
      getTimeRemaining(task, activeDays);
    schedule.push({
      ...task,
      timeRemaining,
      daysRemaining,
      doneToday,
      doneThisWeek,
      todayTime: 0,
      overflow: false,
      status: "ungrouped",
    });
  });
  return schedule;
}
