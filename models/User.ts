interface User {
  /**
   * The user id
   */
  id: string;
  /**
   * the email for the user
   */
  email: string;
  /**
   * Used to identify the user and refer to the user as well
   */
  name: string;
  /**
   * Hours and minute
   */
  weeklyQuota: number;
  /**
   * The days available for scheduling
   */
  activeDays: Array<number>;
  /**
   * The ideal maximum time to spend per day on a single task.
   * It may be exceeded if necessary e.g. not enough days left in the week
   * to complete the task
   */
  dailyMax: number;
  /**
   * The total number of minutes done on a particular date
   * Use dayjs().format('YYYY-MM-DD') to get the date string
   *
   * Example:
   * {
   *   '2020-01-01': 120,
   *   '2020-01-02': 200
   * }
   */
  record: {
    [date: string]: number;
  };
  /**
   * The time the account was created
   */
  createdAt: number;
  updatedAt: number;
  /**
   * timer history
   */
  timer: { value: number; date: number }[];
  currentTimer?: { datetime: number; count: number; isRunning: boolean };
}

export default User;
