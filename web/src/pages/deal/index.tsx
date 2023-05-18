import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MediaStreamRecorderContext } from "../../features/mediaStream/context.ts";

const Page: React.FC = () => {
  const navigate = useNavigate();
  const { startRecording } = useContext(MediaStreamRecorderContext);

  return (
    <Stack rowGap={2} width="600px">
      <Typography>開始を押すと録音が開始されます</Typography>
      <Button
        variant="contained"
        onClick={() => {
          startRecording();
          navigate("images");
        }}
      >
        開始
      </Button>
    </Stack>
  );
};

export default Page;
