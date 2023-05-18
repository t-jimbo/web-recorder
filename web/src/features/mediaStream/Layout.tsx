import Stack from "@mui/material/Stack";
import { Outlet, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { MediaStreamRecorderContext } from "./context.ts";
import { useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";

export const Layout: React.FC = () => {
  const { isRecording } = useContext(MediaStreamRecorderContext);
  const navigate = useNavigate();

  useEffect(() => {
    const f = (e: BeforeUnloadEvent) => {
      if (!isRecording) return;
      // 録音中はページ遷移でアラートを出す
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", f);

    return () => window.removeEventListener("beforeunload", f);
  }, [isRecording]);

  return (
    <Stack rowGap={1}>
      <Stack direction="row" alignItems="center" columnGap={3}>
        <Button onClick={() => navigate("/")}>TOPへ</Button>
        <Typography>{isRecording ? "recording... 🎙" : "stopped 💤"}</Typography>
      </Stack>
      <Divider />
      <Stack padding={1}>
        <Outlet />
      </Stack>
    </Stack>
  );
};
