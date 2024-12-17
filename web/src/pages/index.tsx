import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { MediaStreamRecorderContext } from "../features/mediaStream/context.ts";
import { useContext } from "react";

const Page: React.FC = () => {
  const navigate = useNavigate();
  const { isRecording, src, recorder } = useContext(MediaStreamRecorderContext);

  // if (import.meta.env.PROD)
  return (
    <div>
      <Typography>{isRecording ? "recording" : "stopped"}</Typography>
      <Typography>
        <Typography>{src ? JSON.stringify(src) : "undefined"}</Typography>
      </Typography>
      <Typography>{recorder?.audioBitsPerSecond}</Typography>
    </div>
  );

  return (
    <Stack rowGap={3}>
      <Stack rowGap={1}>
        <Typography>録音機能サンプル</Typography>
        <Stack direction="row" columnGap={2}>
          <Button
            variant="outlined"
            onClick={() => navigate("simple-recorder")}
          >
            録音機能サンプル
          </Button>

          <Button variant="outlined" onClick={() => navigate("gcs")}>
            GCSのアップロードテスト
          </Button>

          <Button variant="outlined" onClick={() => navigate("deal")}>
            一連の流れで試す(未実装)
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Page;
