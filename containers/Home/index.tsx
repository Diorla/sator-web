import useTask from "../../context/task/useTask";
import { Priority } from "../../models/Task";
import { v4 } from "uuid";
import TaskItem from "./TaskItem";
import NoTask from "./NoTask";
import Nav from "./Nav";
import useUser from "../../context/user/useUser";
import dayjs from "dayjs";
import getTimeLeft from "../../utils/getTimeLeft";
import TimeRenderer from "../../components/TimeRenderer";
import Grid from "@mui/material/Grid";
import isToday from "dayjs/plugin/isToday";

dayjs.extend(isToday);

export const initialTask = {
  name: "",
  id: v4(),
  description: "",
  priority: Priority.None,
  color: "#ade01a",
  icon: "",
  weeklyQuota: 0,
  lastDone: 0,
  record: {},
  userId: "",
  createdAt: Date.now(),
  updatedAt: Date.now(),
};
const TaskList = () => {
  const { completed, uncompleted, tasks } = useTask();
  const { user } = useUser();

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
    <Nav>
      <Grid sx={{ display: "flex", alignItems: "center" }}>
        Time: <TimeRenderer time={todoTime} />
        {`, ${deficit > 0 ? "Extra " : "Over"}time: `}
        <TimeRenderer time={Math.abs(deficit)} />
      </Grid>
      {uncompleted.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
      {completed.length ? (
        <>
          <hr />
          <Grid sx={{ display: "flex", alignItems: "center" }}>
            Time: <TimeRenderer time={completedTime} />
          </Grid>
          {completed.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </>
      ) : null}
    </Nav>
  );
};

export default function Home() {
  const { completed, uncompleted, tasks } = useTask();
  const {
    user: { activeDays },
  } = useUser();

  const isCompleted = completed.length && !uncompleted.length;
  const isRemain = uncompleted.length;
  const isEmpty = !tasks.length;

  if (!activeDays.includes(dayjs().day())) return <div>Rest day yea!</div>;
  if (isEmpty) return <NoTask />;

  if (isRemain) return <TaskList />;
  if (isCompleted) return <h1>You have completed all tasks</h1>;
}
