import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { MediaStreamRecorderContext } from "./context.ts";

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

      <audio controls src={src?.url} />
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

  const extension = src?.type?.split("audio/")[1]?.split(";")[0];

  return (
    <Stack direction="row">
      <Button onClick={onStart} disabled={isRecording}>
        Start
      </Button>
      <Button onClick={onStop} disabled={!isRecording}>
        Stop
      </Button>
      <audio controls src={src?.url} />
      <Button
        onClick={() => {
          const a = document.createElement("a");
          a.href = src?.url ?? "";
          a.download = "sample-audio." + extension;
          a.click();
        }}
        disabled={!src}
      >
        ダウンロード
      </Button>
    </Stack>
  );
};
