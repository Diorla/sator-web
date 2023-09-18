import * as React from "react";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import ItemList from "./ItemList";
import useTask from "../../context/task/useTask";
import { useEffect, useState } from "react";

dayjs.extend(isToday);

export default function Switch() {
  const { tasks } = useTask();
  const completed = tasks.filter((item) => item.status === "completed");
  const todo = tasks.filter(
    (item) => item.status === "uncompleted" && !item.overflow
  );
  const upcoming = tasks.filter(
    (item) => item.status === "uncompleted" && item.overflow
  );
  const archived = tasks.filter((item) => item.status === "archived");
  const running = tasks.filter((item) => item.currentTimer?.startTime);
  const [completedToday, setCompletedToday] = useState(0);

  useEffect(() => {
    const completedToday = tasks.reduce((acc, item) => acc + item.doneToday, 0);

    setCompletedToday(completedToday);
  }, [tasks]);

  return (
    <div style={{ flex: 1, marginBottom: 20 }}>
      <div style={{ padding: 8 }}>
        <ItemList
          todo={todo}
          upcoming={upcoming}
          completed={completed}
          archived={archived}
          running={running}
          completedToday={completedToday}
        />
      </div>
    </div>
  );
}
