import Typography from "../../components/Typography";
import minuteToArr from "../../utils/minuteToArr";
import { Schedule } from "../../utils/getSchedule";
import useUser from "../../context/user/useUser";
import addTime from "./addTime";
import { useState } from "react";
import TimeInput from "../../components/TimeInput";

function TimeRenderer({ time }: { time: number }) {
  const [hh, mm] = minuteToArr(time);
  return (
    <span>
      {hh}h {String(Math.round(mm)).padStart(2, "0")}
    </span>
  );
}
export default function TaskItem({ task }: { task: Schedule }) {
  const { user } = useUser();
  const [time, setTime] = useState(0);

  return (
    <div
      style={{
        alignItems: "center",
        maxWidth: 500,
        margin: "10px auto",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        padding: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          maxWidth: 500,
          margin: "10px auto",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
          padding: "10px",
        }}
      >
        <div style={{ flex: 1 }}>
          <Typography type="h3">{task.name}</Typography>
          <Typography>
            Today: <TimeRenderer time={task.todayTime} />
          </Typography>
          <Typography>
            This week: <TimeRenderer time={task.timeRemaining} />
          </Typography>
          <Typography>{task.description || "No description"}</Typography>
        </div>

        <button onClick={() => addTime(task, user, task.todayTime, true)}>
          Mark as done
        </button>
      </div>
      <div>
        <TimeInput value={time} onChangeValue={setTime} />
        <button
          onClick={() => {
            addTime(task, user, time, false);
            setTime(0);
          }}
        >
          Add time
        </button>
      </div>
    </div>
  );
}
