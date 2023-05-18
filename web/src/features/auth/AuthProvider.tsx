import { PropsWithChildren, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export type AuthProviderProps = PropsWithChildren;

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [value, setValue] = useState("");

  if (!isAuthenticated) {
    return (
      <Stack direction="row">
        <TextField
          variant="standard"
          value={value}
          onChange={(e) => setValue(e.target.value as string)}
        />
        <Button
          onClick={() => {
            if (value === import.meta.env.VITE_PASSCODE)
              setIsAuthenticated(true);
          }}
        >
          Submit
        </Button>
      </Stack>
    );
  }

  return <>{children}</>;
};
