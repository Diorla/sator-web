import * as React from "react";
import dayjs from "dayjs";
import { getContrastColor } from "sator-packages";
import RenderSchedule from "../../types/RenderSchedule";
import Stopwatch from "../../components/Stopwatch";
import TimeRenderer from "../../components/TimeRenderer";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import priority from "../../constants/priority";

const RenderCentral = ({
  isRunning,
  task,
  color,
  centralContent,
  centralMessage,
}: {
  isRunning: boolean;
  task: RenderSchedule;
  color: string;
  centralContent: string | number;
  centralMessage: string;
}) => {
  if (isRunning) return <Stopwatch task={task} color={color} />;
  return (
    <>
      {typeof centralContent === "number" ? (
        <TimeRenderer time={centralContent} />
      ) : (
        <Typography style={{ color }}>{centralContent}</Typography>
      )}
      <Typography variant="body1" style={{ color }}>
        {centralMessage}
      </Typography>
    </>
  );
};
export default function TaskItem({
  task,
  showDate,
}: {
  task: RenderSchedule;
  showDate?: boolean;
}) {
  // const navigate = useNavigate();
  const color = getContrastColor(task.color);
  const { status } = task;
  // to-do message
  let centralContent: string | number = task.todayTime - task.doneToday;
  let centralMessage = "Today";
  let bottomRight = ((task.doneToday / task.todayTime) * 100).toFixed(0) + "%";
  if (status === "completed") {
    centralContent = task.doneToday + task.doneThisWeek;
    bottomRight =
      (((task.doneToday + task.doneThisWeek) / task.weeklyQuota) * 100).toFixed(
        0
      ) + "%";
    centralMessage = "Done this week";
  } else if (status === "uncompleted") {
    if (task.overflow) {
      centralContent = task.timeRemaining - task.doneToday;
      bottomRight =
        (
          ((task.doneToday + task.doneThisWeek) / task.weeklyQuota) *
          100
        ).toFixed(0) + "%";
      centralMessage = "This week remaining";
    }
  } else if (status === "archived") {
    const { record } = task;
    let last = 0;
    Object.keys(record).forEach((key) => {
      if (record[key].date > last) last = record[key].date;
    });
    centralContent = last ? dayjs(last).format("DD MMM YYYY") : "Never";
    centralMessage = "Last done";
    bottomRight = dayjs(task.endAt).format("DD MMM YYYY");
  }

  return (
    <Card
      style={{
        borderRadius: 8,
        backgroundColor: task.color,
        maxWidth: 700,
        width: "90%",
        color,
        margin: "auto",
        marginTop: 8,
        marginBottom: 8,
      }}
    >
      <div
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 4,
          display: "flex",
        }}
      >
        <Typography style={{ textAlign: "center", color }}>
          {task.name}
        </Typography>
        <div style={{ flexDirection: "row", justifyContent: "center" }}>
          {task.category && <Chip style={{ color }} label={task.category} />}
        </div>
      </div>
      <div
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          display: "flex",
        }}
      >
        <div style={{ alignItems: "center" }}>
          {showDate ? (
            <>
              <TimeRenderer time={task.weeklyQuota} />
              <Typography style={{ color }}>Weekly quota</Typography>
            </>
          ) : (
            <RenderCentral
              isRunning={task.currentTimer?.isRunning}
              task={task}
              color={color}
              centralContent={centralContent}
              centralMessage={centralMessage}
            />
          )}
        </div>
      </div>
      <div
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 4,
          alignItems: "center",
          display: "flex",
        }}
      >
        <Typography style={{ color }}>{priority[task.priority]}</Typography>
        {task.currentTimer?.isRunning ? (
          <>
            {typeof centralContent === "number" ? (
              <TimeRenderer time={centralContent} />
            ) : (
              <Typography style={{ color }}>{centralContent}</Typography>
            )}
          </>
        ) : (
          <Typography style={{ color }}>{bottomRight}</Typography>
        )}
      </div>
    </Card>
  );
}
