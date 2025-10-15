import { Button, Stack } from "@mui/material";

interface MyButtonProps {
  children: React.ReactNode;
  color: string;
  backgroundColor: string;
  border: string;
  onClick?: () => void;
}

export const MyButton = ({
  onClick,
  children,
  color,
  border,
  backgroundColor = "#1677FF",
}: MyButtonProps) => {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        type="submit"
        variant="contained"
        fullWidth
        onClick={onClick}
        sx={{
          backgroundColor: backgroundColor,
          color: color,
          boxShadow: "none",
          fontStyle: "normal",
          border: border,
          fontSize: "inherit",
          textTransform: "none",
          borderRadius: "8px",
        }}
      >
        {children}
      </Button>
    </Stack>
  );
};
