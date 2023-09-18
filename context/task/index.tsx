import React, { useState, useEffect } from "react";
import TaskContext from "./taskContext";
import watchTasks from "../../services/watchTasks";
import getSchedule from "../../utils/getSchedule";
import { Unsubscribe } from "firebase/firestore";
import dayjs from "dayjs";
import useUser from "../user/useUser";
import isToday from "dayjs/plugin/isToday";
import getUserTime from "../../utils/getUserTime";

dayjs.extend(isToday);

export default function TaskProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: Unsubscribe;
    try {
      unsubscribe = watchTasks(user?.id, (tasks) => {
        const schedule = getSchedule(tasks);

        let cumulativeTime = 0;
        const { todayTime, daysRemaining } = getUserTime(user.weeklyQuota);

        const todayRemaining =
          todayTime -
          schedule.reduce((acc, task) => {
            return acc + task.doneToday;
          }, 1);

        const formattedTask = schedule
          .sort((a, b) => a.lastDone - b.lastDone)
          .sort((a, b) => b.priority - a.priority)
          .map((item) => {
            const {
              timeRemaining,
              dailyMax,
              doneToday,
              doneThisWeek,
              weeklyQuota,
              endAt,
              archived,
            } = item;
            const dailyTaskTime = timeRemaining / daysRemaining;
            let isExpired = false;
            let taskTime = 0;
            let overflow = false;
            let status = "uncompleted";

            // it's passed the end date
            if (endAt && dayjs().valueOf() > endAt) {
              status = "archived";
              isExpired = true;
            }
            // if it's archived by the user, then it's archived
            if (archived) {
              status = "archived";
            }

            // all the time alloted this week is done
            if (doneThisWeek + doneToday >= weeklyQuota) {
              status = "completed";
            }

            //? Task time
            // If there is enough time for the rest of the week
            if (timeRemaining < dailyMax) {
              taskTime = timeRemaining;
            } else if (dailyTaskTime > dailyMax) {
              taskTime = dailyTaskTime;
            } else {
              taskTime = dailyMax;
            }

            if (cumulativeTime > todayRemaining) {
              overflow = true;
            } else {
              if (status !== "archived" && status !== "completed") {
                if (doneToday < taskTime) {
                  cumulativeTime += taskTime - doneToday;
                  if (cumulativeTime > todayRemaining) {
                    const overflowTime = cumulativeTime - todayRemaining - 1;
                    taskTime -= overflowTime;
                  }
                  status = "uncompleted";
                } else {
                  overflow = true;
                }
              }
            }

            //? Status
            // all the time alloted today is done
            if (doneToday > taskTime) {
              overflow = true;
            }

            return {
              ...item,
              todayTime: taskTime,
              overflow,
              status,
              archived: isExpired || archived,
            };
          });
        setTasks(formattedTask);

        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      setError(error);
    }
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [user?.id, user.weeklyQuota]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        error,
        loading,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
