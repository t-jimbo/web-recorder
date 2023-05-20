import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useUploadGCS } from "../features/gcs/useUploadGCS.ts";
import { useState } from "react";
import { useStreamingUpload } from "../features/gcs/useStreamingUpload.ts";

const Page: React.FC = () => {
  const { handleUpload } = useUploadGCS();
  const [file, setFile] = useState<File>();

  const { init, cancelUpload } = useStreamingUpload();

  return (
    <Stack rowGap={2}>
      <Typography fontWeight="700" fontSize="18px">
        GCSテスト
      </Typography>

      <Stack width="300px" rowGap={2} ml={3}>
        <Typography>単一のupload</Typography>
        <input type="file" onChange={(e) => setFile(e.target.files?.[0])} />
        <Button
          variant="contained"
          onClick={() => {
            if (file) handleUpload(file);
          }}
        >
          upload
        </Button>
      </Stack>

      <Divider />

      <Stack width="300px" rowGap={1} ml={3}>
        <Typography>ストリーム upload</Typography>
        <Button variant="outlined" onClick={() => init("sample.mp3")}>
          get uri
        </Button>

        <Button variant="outlined" color="error" onClick={() => cancelUpload()}>
          cancel upload
        </Button>
      </Stack>
    </Stack>
  );
};

export default Page;
