import React, { useState, useEffect } from "react";
import UserContext from "./taskContext";
import watchTasks from "../../services/watchTasks";
import getSchedule from "../../utils/getSchedule";
import { Unsubscribe } from "firebase/firestore";
import dayjs from "dayjs";
import getTimeLeft from "../../utils/getTimeLeft";
import useUser from "../user/useUser";
import isToday from "dayjs/plugin/isToday";

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

  const { today } = getTimeLeft(user);
  useEffect(() => {
    let unsubscribe: Unsubscribe;
    try {
      unsubscribe = watchTasks(user?.id, (tasks) => {
        const schedule = getSchedule(tasks, user.activeDays);

        let todoTime = 0;

        const allSchedule = schedule
          // First sort by the last time they are done (lowest  to highest)
          .sort((a, b) => a.lastDone - b.lastDone)
          // Then by priority, which means if they have the same priority, last done trumps
          .sort((a, b) => b.priority - a.priority)
          .map((item) => {
            if (item.archived)
              return {
                ...item,
              };
            const { daysRemaining, timeRemaining, record } = item;

            const current = timeRemaining / daysRemaining;
            let todayTime = current;
            if (current <= user.dailyMax) {
              if (timeRemaining > user.dailyMax) todayTime = user.dailyMax;
              if (timeRemaining <= user.dailyMax) todayTime = timeRemaining;
            }

            const doneTimes = Object.keys(record);
            const doneToday = doneTimes
              .filter((time) => dayjs().isSame(dayjs(time), "date"))
              .reduce((acc, time) => {
                return acc + record[time];
              }, 0);

            todayTime -= doneToday;
            const thisWeek = timeRemaining - doneToday;
            todoTime += todayTime >= 0 ? todayTime : 0;

            return {
              ...item,
              todayTime: todayTime >= 0 ? todayTime : 0,
              overflow: todoTime > today,
              timeRemaining: thisWeek >= 0 ? thisWeek : 0,
            };
          });

        setTasks(
          allSchedule.map((task) => {
            if (task.archived)
              return {
                ...task,
                status: "archived",
              };
            if (dayjs(task.lastDone).isToday()) {
              return {
                ...task,
                status: "completed",
              };
            } else if (task.timeRemaining) {
              return {
                ...task,
                status: "uncompleted",
              };
            } else if (
              Object.keys(task.record).find((time) => dayjs(time).isToday())
            ) {
              return {
                ...task,
                status: "uncompleted",
              };
            } else {
              return {
                ...task,
                status: "ungrouped",
              };
            }
          })
        );

        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      setError(error);
    }
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [today, user?.activeDays, user?.dailyMax, user?.id]);

  return (
    <UserContext.Provider
      value={{
        tasks,
        error,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
