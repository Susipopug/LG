import FormGroup from "@mui/material/FormGroup";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const AntSwitch = styled(Switch)(({}) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: "width 200ms",
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: "rgba(0,0,0,.25)",
    boxSizing: "border-box",
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
        }}
        control={
          <Switch
            checked={checked}
            onChange={handleChange}
            sx={{
              transform: "scale(1.4)",
              mr: 2,
            }}
          />
        }
        label={label}
      />
    </FormGroup>
  );
};
