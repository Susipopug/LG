import { useForm } from "react-hook-form";
import styles from "./Login.module.css";
import lock from "@assets/images/lock.svg";
import google from "@assets/images/google.svg";
import { Button, Input } from "antd";
import { Link } from "react-router-dom";
import type { ILogin } from "@components/interfaces/Inputs";
import { GoogleButton } from "../UI/GoogleButton/GoogleButton";

// type Inputs = {
//   email: string;
//   password: string;
// };

export const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ILogin>();

  const onSubmit = (data: ILogin) => console.log(data);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerContent}>
          <img src={lock} alt="lock" />
          <div className={styles.title}>Войти в аккаунт</div>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Адрес электронной почты"
              name="email"
              allowClear
            />
            <Input.Password
              {...register("password", { required: "Password is required" })}
              type="password"
              placeholder="Пароль"
              name="password"
              allowClear
              minLength={8}
            />
            <Button type="primary" htmlType="submit">
              Войти
            </Button>
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
