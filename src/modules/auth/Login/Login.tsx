import { Controller, useForm } from "react-hook-form";
import styles from "./Login.module.css";
import lock from "@assets/images/lock.svg";
import { Link } from "react-router-dom";
import type { ILogin } from "@/modules/auth/interfaces/Inputs";
import { GoogleButton } from "@components/UI/GoogleButton";
import { Input } from "antd";
import { MyButton } from "@/components/UI/Button";

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

  const onSubmit = (data: ILogin) => console.log(data);

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
                <Input
                  placeholder="Адрес электронной почты"
                  {...field}
                  status={!!errors.email ? "error" : ""}
                />
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
                  placeholder="Пароль"
                  {...field}
                  status={!!errors.email ? "error" : ""}
                />
              )}
            />

            <MyButton htmlType="submit">Войти</MyButton>
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
