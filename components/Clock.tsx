import * as React from "react";
import { formatTime } from "sator-packages";

export default function Clock({ time }: { time: number }) {
  const { hr, mm, ss } = formatTime(time, "ss");
  return (
    <>
      {String(Math.floor(hr)).padStart(2, "0")}:
      {String(Math.floor(mm)).padStart(2, "0")}:
      {String(Math.floor(ss)).padStart(2, "0")}
    </>
  );
}
