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

// const Android12Switch = styled(Switch)(({ theme }) => ({
//   padding: 8,
//   "& .MuiSwitch-track": {
//     borderRadius: 22 / 2,

//   },
//   "& .MuiSwitch-thumb": {
//     boxShadow: "none",
//     width: 16,
//     height: 16,
//     margin: 2,
//   },
// }));

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

          // Increase size by 1.5x
        }}
        control={
          <AntSwitch
            checked={checked}
            onChange={handleChange}
            sx={{
              transform: "scale(1.4)",
              mr: 2,

              // Increase size by 1.5x
            }}
          />
        }
        label={label}
      />
    </FormGroup>
  );
};
