import styles from "@components/ForgotPassword/ForgotPassword.module.css";
import mag_glass from "@assets/images/mag-glass.svg";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { ILogin, IRegister } from "../interfaces/Inputs";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";

export const RestorePassword: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IRegister>({
    defaultValues: {},
    mode: "onTouched",
  });

  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

  const onSubmit = (data: ILogin) => console.log(data);
  return (
    <div className={styles.container}>
      <div className={styles.containerContent}>
        <img src={mag_glass} alt="mag_glass" />
        <h1 className={styles.title}>Воccтановить пароль</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {/* Password */}

          <div className="inputWrapper">
            <TextField
              {...register("password", {
                required: "Поле необходимо заполнить",
                minLength: {
                  value: 8,
                  message: "Пароль должен содержать не менее 8 символов",
                },
              })}
              type={showPassword ? "text" : "password"}
              label="Пароль"
              fullWidth
              size="small"
              slotProps={{
                input: {
                  endAdornment: (
                    <>
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          sx={{ color: "grey.500" }}
                        >
                          {showPassword ? (
                            <Visibility fontSize="small" />
                          ) : (
                            <VisibilityOff fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>

                      {passwordValue && (
                        <InputAdornment position="end">
                          <IconButton
                            size="small"
                            aria-label="clear input"
                            onClick={() =>
                              setValue("password", "", { shouldValidate: true })
                            }
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
            {errors.password && (
              <p role="alert" style={{ color: "red" }}>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* ConfirmPassword */}

          <div className="inputWrapper">
            <TextField
              {...register("confirmPassword", {
                required: "Поле необходимо заполнить",
                validate: (value) =>
                  value === passwordValue || "Пароли не совпадают",
              })}
              type={showConfirmPassword ? "text" : "password"}
              label="Повтор пароля"
              fullWidth
              size="small"
              slotProps={{
                input: {
                  endAdornment: (
                    <>
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          sx={{ color: "grey.500" }}
                        >
                          {showConfirmPassword ? (
                            <Visibility fontSize="small" />
                          ) : (
                            <VisibilityOff fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>

                      {confirmPasswordValue && (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="clear input"
                            onClick={() =>
                              setValue("confirmPassword", "", {
                                shouldValidate: true,
                              })
                            }
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
            {errors.confirmPassword && (
              <p role="alert" style={{ color: "red" }}>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#1677FF",
                fontStyle: "normal",
                fontSize: "inherit",
                textTransform: "none",
              }}
            >
              Восстановить пароль
            </Button>
          </Stack>
        </form>

        <Link to="/login" className={styles.link}>
          Назад
        </Link>
      </div>
    </div>
  );
};
