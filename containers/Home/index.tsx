import useTask from "../../context/task/useTask";
import { Priority } from "../../models/Task";
import { v4 } from "uuid";
import TaskItem from "./TaskItem";
import NoTask from "./NoTask";
import useUser from "../../context/user/useUser";
import dayjs from "dayjs";
import getTimeLeft from "../../utils/getTimeLeft";
import TimeRenderer from "../../components/TimeRenderer";
import Grid from "@mui/material/Grid";
import isToday from "dayjs/plugin/isToday";
import { useEffect, useState } from "react";

dayjs.extend(isToday);

export const initialTask = {
  name: "",
  id: v4(),
  description: "",
  priority: Priority.None,
  color: "#" + Math.floor(Math.random() * 256 ** 3).toString(16),
  icon: "",
  weeklyQuota: 0,
  lastDone: 0,
  record: {},
  userId: "",
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

const TaskList = () => {
  const { tasks } = useTask();
  const { user } = useUser();

  const completed = tasks.filter((task) => task.status === "completed");
  const uncompleted = tasks.filter((task) => task.status === "uncompleted");
  const { today } = getTimeLeft(user);
  const todoTime = uncompleted.reduce((acc, item) => acc + item.todayTime, 0);

  const completedTime = tasks.reduce((acc, item) => {
    const todayTime = Object.keys(item.record)
      .filter((dateTimeKey) => dayjs(dateTimeKey).isToday())
      .reduce((acc, dateTimeKey) => acc + item.record[dateTimeKey], 0);
    return acc + todayTime;
  }, 0);

  const deficit = today - todoTime;
  return (
    <>
      <Grid sx={{ display: "flex", alignItems: "center" }}>
        Todo:&nbsp;
        <TimeRenderer time={todoTime} />
        {`, ${deficit > 0 ? "Extra " : "Over"}time:`}&nbsp;
        <TimeRenderer time={Math.abs(deficit)} />
      </Grid>
      {uncompleted.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
      {completed.length ? (
        <>
          <hr />
          <Grid sx={{ display: "flex", alignItems: "center" }}>
            Completed:&nbsp;
            <TimeRenderer time={completedTime} />
          </Grid>
          {completed.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </>
      ) : null}
    </>
  );
};

export default function Home() {
  const { tasks } = useTask();
  const {
    user: { activeDays },
  } = useUser();

  const [status, setStatus] = useState("");

  useEffect(() => {
    const completed = tasks.filter((task) => task.status === "completed");
    const uncompleted = tasks.filter((task) => task.status === "uncompleted");

    const isCompleted = completed.length && !uncompleted.length;
    const isRemain = uncompleted.length;
    const isEmpty = !tasks.length;
    if (isEmpty) setStatus("empty");
    if (isCompleted) setStatus("completed");
    if (isRemain) setStatus("todo");
    if (!activeDays.includes(dayjs().day())) setStatus("rest");
  }, [tasks.length]);

  if (status === "rest") return <div>Rest day yea!</div>;
  if (status === "empty") return <NoTask />;
  if (status === "todo") return <TaskList />;
  if (status === "completed") return <h1>You have completed all tasks</h1>;
  return null;
}
