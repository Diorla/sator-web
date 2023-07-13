import * as React from "react";
import minuteToArr from "../utils/minuteToArr";
import Typography from "@mui/material/Typography";

export default function TimeRenderer({ time }: { time: number }) {
  const [hh, mm] = minuteToArr(time);
  return (
    <Typography>
      {hh}h {String(Math.round(mm)).padStart(2, "0")}
    </Typography>
  );
}
