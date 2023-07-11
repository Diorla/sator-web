import User from "../models/User";
import dayjs from "dayjs";
import getDateKey from "./getDateKey";

export type TimeLeft = {
  today: number;
  thisWeek: number;
};

/**
 * Figures out how many minutes are left in the current week and day for the
 * user to perform all their task if possible.
 * @param user
 * @returns
 */
export default function getTimeLeft(user: User): TimeLeft {
  if (!user)
    return {
      today: 0,
      thisWeek: 0,
    };
  const { weeklyQuota = 0, record = {}, activeDays } = user;

  const todayKey = getDateKey();
  // total minutes done today
  const todayRecord = record[todayKey] || 0;
  // total minutes done this week
  const thisWeekDone = Object.keys(record)
    .filter(
      (key) =>
        dayjs().isSame(dayjs(key), "week") && dayjs().isSame(dayjs(key), "day")
    )
    .reduce((total, key) => total + record[key], 0);

  const daysBeforeCreation = [];
  const daysRemaining = [];
  activeDays.forEach((day) => {
    if (day >= dayjs().day()) {
      daysRemaining.push(day);

      if (
        dayjs().isSame(user.createdAt, "week") &&
        dayjs(user.createdAt).isAfter(dayjs().day(day), "day")
      ) {
        daysBeforeCreation.push(day);
      }
    }
  });

  // This will only be less than the activeDays for the first week
  // Excluding the days before the user joined
  const daysAvailableThisWeek = activeDays.length - daysBeforeCreation.length;
  // Based on the days available this week. It should be the same as weekly
  // quota if the user is a member for more than one week of course
  const quotaAvailableThisWeek =
    (weeklyQuota / activeDays.length) * daysAvailableThisWeek;
  // Subtracting total available weekly quota and the minutes already done
  const thisWeekRemaining = quotaAvailableThisWeek - thisWeekDone;
  // Evenly distributing the minutes remaining across the remaining days
  const todayQuota = thisWeekRemaining / daysRemaining.length;
  // Subtracting the time already spent on that particular day
  const todayRemaining = todayQuota - todayRecord;

  return {
    today: todayRemaining,
    thisWeek: thisWeekRemaining,
  };
}
