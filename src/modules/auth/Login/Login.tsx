import { Controller, useForm } from "react-hook-form";
import styles from "./Login.module.css";
import lock from "@assets/images/lock.svg";
import { Link } from "react-router-dom";
import type { ILogin } from "@/modules/auth/interfaces/Inputs";
import { GoogleButton } from "@components/UI/GoogleButton";
import { Button, Stack,  } from "@mui/material";
import { Input } from "antd";

export const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<ILogin>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const passwordValue = watch("password");

  const onSubmit = (data: ILogin) => console.log(data);
  console.log(
    register("email", {
      required: "Поле необходимо заполнить",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Неверный адрес электронной почты",
      },
    })
  );

  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerContent}>
          <img height={180} width={200} src={lock} alt="lock" />
          <h1 className={styles.title}>Войти в аккаунт</h1>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {/* Email */}
            <Controller
              {...register("email", {
                required: "Поле необходимо заполнить",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Неверный адрес электронной почты",
                },
              })}
              control={control}
              render={({ field }) => (
                <Input {...field} status={!!errors.email ? "error" : ""} />
              )}
            />

            {/* Password*/}

            <Controller
              {...register("password", {
                required: "Поле необходимо заполнить",
                minLength: {
                  value: 8,
                  message: "Пароль должен содержать не менее 8 символов",
                },
              })}
              control={control}
              render={({ field }) => (
                <Input.Password
                  placeholder="input password support suffix"
                  {...field}
                  status={!!errors.email ? "error" : ""}
                />
              )}
            />

            {/* <PasswordInput
              {...register("password", {
                required: "Поле необходимо заполнить",
                minLength: {
                  value: 8,
                  message: "Пароль должен содержать не менее 8 символов",
                },
              })}
              value={passwordValue}
              label="Пароль"
              fullWidth
              size="small"
              helperText={errors.password?.message}
              error={!!errors.password}
            /> */}

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
