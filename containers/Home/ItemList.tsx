import * as React from "react";
import dayjs from "dayjs";
import TimeRenderer from "../../components/TimeRenderer";
import pluralize from "pluralize";
import RenderSchedule from "../../types/RenderSchedule";
import TaskItem from "./TaskItem";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import { AccordionDetails, AccordionSummary } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

export default function ItemList({
  todo,
  upcoming,
  completed,
  archived,
  running,
  completedToday,
}: {
  todo: RenderSchedule[];
  upcoming: RenderSchedule[];
  completed: RenderSchedule[];
  archived: RenderSchedule[];
  running: RenderSchedule[];
  completedToday: number;
}) {
  const todoTime = todo.reduce(
    (acc, task) => acc + task.todayTime - task.doneToday,
    0
  );

  const percent = Math.round(
    (completedToday / (todoTime + completedToday)) * 100
  );

  const completedTime = completed.reduce(
    (acc, task) => acc + task.doneThisWeek + task.doneToday,
    0
  );

  const timeRemaining = upcoming.reduce(
    (acc, task) => acc + task.timeRemaining - task.doneToday,
    0
  );

  return (
    <>
      <div
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          display: "flex",
        }}
      >
        <div>
          <Typography variant="h5">
            Today&apos;s {dayjs().format("dddd")},
          </Typography>
          <Typography variant="h5">{dayjs().format("DD MMM YYYY")}</Typography>
        </div>
        <div>
          <Typography variant="h5" style={{ textAlign: "right" }}>
            {Number.isNaN(percent) ? 100 : percent}% Complete
          </Typography>
          <Typography variant="h5" style={{ textAlign: "right" }}>
            {todo.length || "No"} {pluralize("task", todo.length)} remaining
          </Typography>
        </div>
      </div>
      <div>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          {running.map((task) => {
            return <TaskItem task={task} key={task.id} />;
          })}
        </div>
        {todo.length ? (
          <div>
            <Typography>
              Todo: <TimeRenderer time={todoTime} />
            </Typography>
            <div style={{ justifyContent: "center", alignItems: "center" }}>
              {todo.map((task) => {
                return <TaskItem task={task} key={task.id} />;
              })}
            </div>
          </div>
        ) : null}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>
              Upcoming: <TimeRenderer time={timeRemaining} />
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h5">
              {upcoming.length || "No"} upcoming{" "}
              {pluralize("task", upcoming.length)}
            </Typography>
            <div style={{ justifyContent: "center", alignItems: "center" }}>
              {upcoming
                .sort((a, b) => b.timeRemaining - a.timeRemaining)
                .map((task) => {
                  return <TaskItem task={task} key={task.id} />;
                })}
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>
              Completed: <TimeRenderer time={completedTime} />
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h5">
              {completed.length || "No"} completed{" "}
              {pluralize("task", completed.length)}
            </Typography>
            <div style={{ justifyContent: "center", alignItems: "center" }}>
              {completed
                .sort((a, b) => a.lastDone - b.lastDone)
                .map((task) => {
                  return <TaskItem task={task} key={task.id} />;
                })}
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Archived</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h5">
              {archived.length || "No"} archived{" "}
              {pluralize("task", completed.length)}
            </Typography>
            <div style={{ justifyContent: "center", alignItems: "center" }}>
              {archived
                .sort((a, b) => a.lastDone - b.lastDone)
                .map((task) => {
                  return <TaskItem task={task} key={task.id} />;
                })}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}
