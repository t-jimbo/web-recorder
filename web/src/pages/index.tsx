import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const Page: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Stack rowGap={3}>
      <Stack>
        <Typography>Recording</Typography>
        <Button onClick={() => navigate("simple-recorder")}>録音</Button>
      </Stack>
    </Stack>
  );
};

export default Page;
