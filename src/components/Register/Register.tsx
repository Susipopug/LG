import { useForm, type FieldErrors, type SubmitHandler } from "react-hook-form";
import styles from "./Register.module.css";
import hands from "@assets/images/hands.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { GoogleButton } from "../UI/GoogleButton/GoogleButton";

// Inside your component...

interface IRegister {
  email: string;
  password: string;
  confirmPassword: string;
}

export const Register: React.FC = () => {
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

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<IRegister>({
    mode: "onTouched",
  });

  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

  const onSubmit: SubmitHandler<IRegister> = (data) =>
    console.log("submited data", data);

  const onError = (errors: FieldErrors<IRegister>) => {
    console.log("Form errors:", errors);
  };

  console.log("errors:", errors);
  console.log("getValues:", getValues());

  return (
    <div className={styles.container}>
      <div className={styles.containerContent}>
        <img src={hands} alt="hands" />

        <h1 className={styles.title}>Создать аккаунт</h1>

        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className={styles.form}
        >
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
              helperText={errors.email?.message}
              error={!!errors.email}
              slotProps={{
                inputLabel: {
                  sx: {
                    color: "grey.400",
                  },
                },
              }}
            />
            {/* {errors.email && (
              <p role="alert" style={{ color: "red" }}>
                {errors.email.message}
              </p>
            )} */}
          </div>
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
              helperText={errors.password?.message}
              error={!!errors.password}
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
            {/* {errors.password && (
              <p role="alert" style={{ color: "red" }}>
                {errors.password.message}
              </p>
            )} */}
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
              helperText={errors.confirmPassword?.message}
              error={!!errors.confirmPassword}
              slotProps={{
                input: {
                  endAdornment: (
                    <>
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge="end"
                          sx={{ color: "grey.500" }}
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff fontSize="small" />
                          ) : (
                            <Visibility fontSize="small" />
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
            {/* {errors.confirmPassword && (
              <p role="alert" style={{ color: "red" }}>
                {errors.confirmPassword.message}
              </p>
            )} */}
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
              Зарегистрироваться
            </Button>
          </Stack>
        </form>
        <GoogleButton />
        <Link to={"/login"} className={styles.link}>
          Уже есть аккаунт
        </Link>
      </div>
    </div>
  );
};
