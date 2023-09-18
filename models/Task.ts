export enum Priority {
  None,
  Low,
  Medium,
  High,
}

export type Record = {
  length: number;
  note: string;
  // The date set for the log, user can update this
  date: number;
};

interface Task {
  id: string;
  /**
   * The name of the task
   */
  name: string;
  /**
   * About the task
   */
  description: string;
  /**
   * 1 is low, 2 is medium, 3 is high. 0 is none
   */
  priority: Priority;
  /**
   * The minutes to be allocated to the task per week if possible
   */
  weeklyQuota: number;
  /**
   * This is the time stamp for when the task was last done. It will be used
   * to determine the order of the task as well (after priority and time)
   */
  lastDone: number;
  /**
   * This does exactly the same thing as doneTimes, but it is used to calculate
   * the number of hours done as well.
   * This is only important if the hours changes, e.g. before it was 2 hours
   * a week, then now the user has turned it to 3 hours a week. So the items in
   * doneTimes should match the keys in record, that is, doneTimes = Object.keys(record);
   * doneTimes removed
   */
  record: {
    // Generated from the initial date time (getDateTimeKey). It will not
    // change, and indicates when the time was saved.
    [id: string]: Record;
  };
  /**
   * Task like this will not show in the schedule
   */
  archived?: boolean;
  /**
   * The id of the creator
   */
  userId: string;
  /**
   * The date that it was created. It will also be the start date automatically
   */
  createdAt: number;
  /**
   * The date that it will end and stop appearing on todo list
   */
  endAt: number;
  /**
   * Any time there is an update to the task.
   */
  updatedAt: number;
  /**
   * Maximum minutes in a day. It will only hold true if there is sufficient remaining time in the week
   */
  dailyMax: number;
  /**
   * Used to group the tasks
   */
  category: string;
  /**
   * Stylistics preference
   */
  color: string;
  /**
   * If a timer is running
   */
  currentTimer?: { startTime: number; count: number; isRunning: boolean };
  /**
   * The list of subtasks that are associated with this task. Users can use it to set targets to achieve
   */
  tasks: {
    name: string;
    id: string;
    checked: boolean;
  }[];
}

export default Task;
