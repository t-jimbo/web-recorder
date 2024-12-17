import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { oauthSignIn } from "../features/oauth/oauthSignIn.ts";

const Page: React.FC = () => {
  return (
    <Stack>
      <Button onClick={oauthSignIn}>get access token</Button>
    </Stack>
  );
};

export default Page;
