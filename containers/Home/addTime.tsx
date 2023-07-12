import { Schedule } from "../../utils/getSchedule";
import getDateTimeKey from "../../utils/getDateTimeKey";
import updateTask, { UpdateTask } from "../../services/updateTask";
import getDateKey from "../../utils/getDateKey";
import updateUser from "../../services/updateUser";
import User from "../../models/User";

export default async function addTime(
  task: Schedule,
  user: User,
  time: number,
  isCompleted?: boolean
) {
  const dateTimeKey = getDateTimeKey();

  const {
    id,
    name,
    description,
    priority,
    color,
    icon,
    weeklyQuota: taskTime,
    record,
  } = task;

  const updatedTask: UpdateTask = {
    id,
    name,
    description,
    priority,
    color,
    icon,
    weeklyQuota: taskTime,
    lastDone: isCompleted ? Date.now() : task.lastDone,
    record: {
      ...record,
      [dateTimeKey]: time,
    },
    userId: user.id,
  };

  const dateKey = getDateKey();
  const today = user.record[dateKey] || 0;
  const newUser = {
    ...user,
    record: {
      ...user.record,
      [dateKey]: today + time,
    },
  };

  updateTask(updatedTask);
  updateUser(newUser);
}
