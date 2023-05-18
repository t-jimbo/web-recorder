import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const Page: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Stack rowGap={3}>
      <Stack rowGap={1}>
        <Typography>録音機能を試す</Typography>
        <Stack direction="row" columnGap={2}>
          {/*<Button*/}
          {/*  variant="outlined"*/}
          {/*  onClick={() => navigate("simple-recorder")}*/}
          {/*>*/}
          {/*  録音機能サンプル*/}
          {/*</Button>*/}
          <Button variant="outlined" onClick={() => navigate("deal")}>
            一連の流れで試す
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Page;
