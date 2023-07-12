import useTask from "../../context/task/useTask";
import { Priority } from "../../models/Task";
import { v4 } from "uuid";
import TaskItem from "./TaskItem";
import NoTask from "./NoTask";
import Nav from "./Nav";

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
  const { completed, uncompleted } = useTask();

  return (
    <Nav>
      {uncompleted.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
      <hr />
      {completed.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </Nav>
  );
};
export default function Home() {
  const { completed, uncompleted, tasks } = useTask();

  const isCompleted = completed.length && !uncompleted.length;
  const isRemain = uncompleted.length;
  const isEmpty = !tasks.length;

  if (isEmpty) return <NoTask />;
  if (isRemain) return <TaskList />;
  if (isCompleted) return <h1>You have completed all tasks</h1>;
}
