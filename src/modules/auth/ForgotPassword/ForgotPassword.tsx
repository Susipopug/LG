import styles from "./ForgotPassword.module.css";
import mag_glass from "@assets/images/mag-glass.svg";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { LetterSent } from "../LetterSent/LetterSent";
import { Input } from "antd";
import { MyButton } from "@/components/UI/MyButton";

interface IForgotPassword {
  email: string;
}
export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IForgotPassword>({
    mode: "onSubmit",
  });

  const onSubmit = (data: IForgotPassword) => {
    console.log(data);
    setEmail(data.email);
  };

  if (email) {
    return <LetterSent email={email} />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.containerContent}>
        <img height={180} width={200} src={mag_glass} alt="mag_glass" />
        <h1 className={styles.title}>Воccтановить пароль</h1>
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

          <MyButton htmlType="submit">Отправить запрос</MyButton>
        </form>

        <Link to="/login" className={styles.link}>
          Назад
        </Link>
      </div>
    </div>
  );
};
