import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { RecorderContext } from "./RecorderContext.ts";

export const RecorderPage: React.FC = () => {
  const { isRecording, onStart, onStop } = useContext(RecorderContext);

  return (
    <Stack rowGap={2}>
      <Stack direction="row">
        <Button onClick={onStart} disabled={isRecording}>
          Start
        </Button>
        <Button onClick={onStop} disabled={!isRecording}>
          Stop
        </Button>
      </Stack>
    </Stack>
  );
};
