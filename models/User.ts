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
   * The list of minutes available for the user on each day
   *So the length should be 7 and the first element should be the total minutes available for the user on Sunday
   *
   * Example:
   * [
   *   120,
   *   200,
   *   100,
   *   150,
   *   200,
   *   100,
   *   150
   * ]
   * 0 will indicate a rest day
   */
  weeklyQuota: number[];
  /**
   * The time the account was created
   */
  createdAt: number;
  updatedAt: number;
}

export default User;
