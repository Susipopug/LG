import FormGroup from "@mui/material/FormGroup";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const CustomSwitch = styled(Switch)(({ theme }) => ({
  width: 46,
  height: 23,
  padding: 0,
  borderRadius: 23,
  "& .MuiSwitch-switchBase": {
    padding: 2,
    margin: 1,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(22px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#4096FF" : "#4096FF",
        opacity: 1,
        border: 0,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 18,
    height: 18,
  },
  "& .MuiSwitch-track": {
    borderRadius: 20 / 2,
    backgroundColor: theme.palette.mode === "dark" ? "#39393D" : "#bebebe",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

interface SwitcherProps {
  id: string;
  label?: string;
  checked: boolean;
  onChange: (id: string) => void;
}

export const Switcher: React.FC<SwitcherProps> = ({
  id,
  label = "Проведено",
  checked,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(id);
  };
  return (
    <FormGroup>
      <FormControlLabel
        sx={{
          marginLeft: 0,
          // Increase size by 1.5x
        }}
        control={
          <CustomSwitch
            checked={checked}
            onChange={handleChange}
            sx={{
              transform: "scale(1)",
              mr: 1,

              // Increase size by 1.5x
            }}
          />
        }
        label={label}
      />
    </FormGroup>
  );
};
