import { Button, Stack } from "@mui/material";

interface MyButtonProps {
  children: React.ReactNode;
  color: string;
}

export const MyButton = ({ children, color = "blue" }: MyButtonProps) => {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          //   backgroundColor: "#1677FF",
          boxShadow: "none",
          fontStyle: "normal",
          fontSize: "inherit",
          textTransform: "none",
        }}
      >
        {children}
      </Button>
    </Stack>
  );
};
