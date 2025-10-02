import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { forwardRef, useState, type ComponentProps } from "react";

export const PasswordInput = forwardRef<
  HTMLInputElement,
  ComponentProps<typeof TextField>
>(({ value, onChange, ...restProps }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  // const [inputValue, setInputValue] = useState(value);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  console.log(value);

  const handleClear = () => {
    // Create a proper React change event
    const event = {
      target: {
        value: "",
        name: restProps.name || "",
      },
    } as React.ChangeEvent<HTMLInputElement>;

    onChange?.(event);
  };

  return (
    <TextField
      ref={ref}
      {...restProps}
      // onChange={handleChange}
      onChange={onChange}
      value={value}
      type={showPassword ? "text" : "password"}
      slotProps={{
        input: {
          endAdornment: (
            <>
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                  sx={{ color: "grey.500" }}
                >
                  {showPassword ? (
                    <VisibilityOff fontSize="small" />
                  ) : (
                    <Visibility fontSize="small" />
                  )}
                </IconButton>
              </InputAdornment>

              {value && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    aria-label="clear input"
                    //@ts-ignore
                    // onClick={() => onChange?.({ target: { value: "" } })}
                    onClick={handleClear}
                    edge="end"
                    sx={{ color: "grey.500" }}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              )}
            </>
          ),
        },
        inputLabel: {
          sx: {
            color: "grey.400",
          },
        },
      }}
    />
  );
});
