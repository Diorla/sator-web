export enum Priority {
  None,
  Low,
  Medium,
  High,
}

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
  color: string;
  icon: string;
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
   * Keeps track of each time the task is done. This will be used to calculate
   * time left.
   */
  // doneTimes: Array<string>;
  /**
   * This does exactly the same thing as doneTimes, but it is used to calculate
   * the number of hours done as well.
   * This is only important if the hours changes, e.g. before it was 2 hours
   * a week, then now the user has turned it to 3 hours a week. So the items in
   * doneTimes should match the keys in record, that is, doneTimes = Object.keys(record);
   * doneTimes removed
   */
  record: {
    [date: string]: number;
  };
  /**
   * Task like this will not show in the schedule
   */
  archived?: boolean;

  /**
   * The id of the creator
   */
  userId: string;
  createdAt: number;
  updatedAt: number;
}

export default Task;
