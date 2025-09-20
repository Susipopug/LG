import { useForm } from "react-hook-form";
import styles from "./Login.module.css";
import lock from "@assets/images/lock.svg";
import { Link } from "react-router-dom";
import type { ILogin } from "@components/interfaces/Inputs";
import { GoogleButton } from "../UI/GoogleButton/GoogleButton";
import { Button, Stack, TextField } from "@mui/material";
import { PasswordInput } from "../UI/PasswordInput";

export const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
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

            {/* Password*/}

            <PasswordInput
              {...register("password", {
                required: "Поле необходимо заполнить",
                minLength: {
                  value: 8,
                  message: "Пароль должен содержать не менее 8 символов",
                },
              })}
              value={passwordValue}
              // value={watch("password") || ""}
              label="Пароль"
              fullWidth
              size="small"
              helperText={errors.password?.message}
              error={!!errors.password}
            />

            <Stack direction="row" spacing={2}>
              <Button
                type="submit"
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
          <Link to="/forgotPassword" className={styles.link}>
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
