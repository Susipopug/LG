import styles from "@components/ForgotPassword/ForgotPassword.module.css";
import mag_glass from "@assets/images/mag-glass.svg";
import { Button, Input } from "antd";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { ILogin } from "../interfaces/Inputs";

export const ForgotPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ILogin>();

  const onSubmit = (data: ILogin) => console.log(data);
  return (
    <div className={styles.container}>
      <div className={styles.containerContent}>
        <img src={mag_glass} alt="mag_glass" />
        <div className={styles.title}>Воccтановить пароль</div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Input
            {...register("email", { required: "Email is required" })}
            type="email"
            placeholder="Адрес электронной почты"
            name="email"
            allowClear
          />

          <Button type="primary" htmlType="submit">
            Отправить запрос
          </Button>
        </form>

        <Link to="/login" className={styles.link}>Назад</Link>
      </div>
    </div>
  );
};
