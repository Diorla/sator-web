import Task from "../models/Task";

type Schedule = Task & {
  timeRemaining: number;
  todayTime: number;
  overflow: boolean;
  status: "completed" | "uncompleted" | "archived" | "ungrouped";
  doneToday: number;
  doneThisWeek: number;
};
export default Schedule;
