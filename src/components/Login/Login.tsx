import { useForm } from "react-hook-form";
import styles from "./Login.module.css";
import lock from "@assets/images/lock.svg";
import { Link } from "react-router-dom";
import type { ILogin } from "@components/interfaces/Inputs";
import { GoogleButton } from "../UI/GoogleButton/GoogleButton";
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

export const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

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
  } = useForm<ILogin>({
    mode: "onTouched",
  });

  const passwordValue = watch("password");

  const onSubmit = (data: ILogin) => console.log(data);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerContent}>
          <img src={lock} alt="lock" />
          <h1 className={styles.title}>Войти в аккаунт</h1>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>


             {/* Email */}

            <div className="inputWrapper">
              <TextField
                {...register("email", {
                  required: "Поле необходимо заполнить",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Неверный адрес электронной почты",
                  },
                })}
                type="email"
                fullWidth
                size="small"
                label="Адрес электронной почты"
                slotProps={{
                  inputLabel: {
                    sx: {
                      color: "grey.400",
                    },
                  },
                }}
              />
              {errors.email && (
                <p role="alert" style={{ color: "red" }}>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password*/}

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
                                setValue("password", "", {
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
              {errors.password && (
                <p role="alert" style={{ color: "red" }}>
                  {errors.password.message}
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
                Войти
              </Button>
            </Stack>
          </form>

          <GoogleButton />
          <Link to="/forgot" className={styles.link}>
            Забыли пароль
          </Link>
          <Link to="/register" className={styles.link}>
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </>
  );
};
