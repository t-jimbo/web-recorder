import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Page: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Stack rowGap={2}>
      <Typography>開始を押すと録音が開始されます</Typography>
      <Button variant="contained" onClick={() => navigate("images")}>
        開始
      </Button>
    </Stack>
  );
};

export default Page;
