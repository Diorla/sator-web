import * as React from "react";
import { useEffect, useState } from "react";
import Task from "../models/Task";
import useInterval from "../hooks/useInterval";
import Clock from "./Clock";
import Typography from "@mui/material/Typography";

export default function Stopwatch({ task, color }: { task: Task; color }) {
  const [count, setCount] = React.useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const { currentTimer } = task;
  useInterval(
    () => {
      setCount(count + 1);
    },
    isRunning ? 1000 : null
  );

  const {
    startTime,
    count: timerCount = 0,
    isRunning: timerIsRunning = false,
  } = currentTimer || {};

  useEffect(() => {
    if (timerIsRunning) {
      const newCountdown = (Date.now() - startTime) / 1000;
      setCount(newCountdown);
    } else {
      setCount(timerCount);
    }
    setIsRunning(timerIsRunning);
  }, [startTime, timerCount, timerIsRunning]);

  // TODO: Use load / unload
  // useEffect(() => {
  //   const subscription = AppState.addEventListener("change", (state) => {
  //     if (state === "active") {
  //       if (timerIsRunning) {
  //         const newCountdown = (Date.now() - startTime) / 1000;
  //         setCount(newCountdown);
  //       } else {
  //         setCount(timerCount);
  //       }
  //       setIsRunning(timerIsRunning);
  //     }
  //   });
  //   return () => subscription.remove();
  // }, [startTime, timerCount, timerIsRunning]);

  return (
    <Typography>
      <Clock time={count} />
    </Typography>
  );
}
