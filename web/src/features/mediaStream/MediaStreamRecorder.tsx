import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { MediaStreamRecorderContext } from "./context.ts";
import { Typography } from "@mui/material";

export const MediaStreamRecorder: React.FC = () => {
  const {
    startRecording: onStart,
    stopRecording: onStop,
    isRecording,
    src,
  } = useContext(MediaStreamRecorderContext);
  return (
    <Stack rowGap={2}>
      <Typography>MediaStream Recording API</Typography>
      <Stack direction="row">
        <Button onClick={onStart} disabled={isRecording}>
          Start
        </Button>
        <Button onClick={onStop} disabled={!isRecording}>
          Stop
        </Button>
      </Stack>

      <audio controls src={src} />
    </Stack>
  );
};

export const RecorderForHeader: React.FC = () => {
  const {
    startRecording: onStart,
    stopRecording: onStop,
    isRecording,
    src,
  } = useContext(MediaStreamRecorderContext);
  return (
    <Stack direction="row">
      <Button onClick={onStart} disabled={isRecording}>
        Start
      </Button>
      <Button onClick={onStop} disabled={!isRecording}>
        Stop
      </Button>
      <audio controls src={src} />
    </Stack>
  );
};
