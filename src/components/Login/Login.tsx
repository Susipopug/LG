import { useForm } from "react-hook-form";
import styles from "./Login.module.css";
import lock from "@assets/images/lock.svg";
import google from "@assets/images/google.svg";
import { Button, Input } from "antd";
import { Link } from "react-router";
import type { ILogin } from "@components/interfaces/Inputs";

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
          <div className={styles.separator}> или</div>
          <button className={styles.googleButton}>
            <img src={google} alt="Google" className={styles.googleIcon} />
            Google
          </button>
          <Link to={"/forgot"} className={styles.forgot}>
            Забыли пароль
          </Link>
          <div className={styles.register}>
            <Link to="/register">Зарегистрироваться</Link>
          </div>
        </div>
      </div>
    </>
  );
};
