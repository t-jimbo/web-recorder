import Typography from "@mui/material/Typography";
import { useState } from "react";

export type TimeCountProps = {
  startedAt: Date;
};

export const TimeCount: React.FC<TimeCountProps> = ({ startedAt }) => {
  const [time, setTime] = useState("00:00:00");
  setInterval(() => {
    setTime(culcurateTime(startedAt));
  }, 1000);

  return <Typography>{time}</Typography>;
};

const culcurateTime = (startedAt: Date): string => {
  const format00 = (num: number): string => {
    return ("0" + num).slice(-2);
  };

  const diff = new Date().getTime() - startedAt.getTime();
  const hour = format00(Math.floor(diff / (60 * 60 * 1000)) % 24);
  const min = format00(Math.floor(diff / (60 * 1000)) % 60);
  const sec = format00(Math.floor(diff / 1000) % 60);

  return `${hour}:${min}:${sec}`;
};
