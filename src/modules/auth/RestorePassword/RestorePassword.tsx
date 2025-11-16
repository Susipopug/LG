import styles from "./RestorePassword.module.css";
import mag_glass from "@assets/images/mag-glass.svg";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import type { ILogin, IRegister } from "../interfaces/Inputs";
import { MyButton } from "@/components/UI/MyButton";
import { Input } from "antd";

export const RestorePassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<IRegister>({
    defaultValues: {},
    mode: "onSubmit",
  });

  const passwordValue = watch("password");

  const onSubmit = (data: ILogin) => {
    console.log(data);
  };
  return (
    <div className={styles.container}>
      <div className={styles.containerContent}>
        <img height={180} width={200} src={mag_glass} alt="mag_glass" />
        <h1 className={styles.title}>Воccтановить пароль</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
                status={!!errors.password ? "error" : ""}
              />
            )}
          />

          {/* ConfirmPassword */}
          <Controller
            {...register("confirmPassword", {
              required: "Поле необходимо заполнить",
              validate: (value) =>
                value === passwordValue || "Пароли не совпадают",
            })}
            control={control}
            render={({ field }) => (
              <Input.Password
                placeholder="Повтор пароля"
                {...field}
                status={!!errors.confirmPassword ? "error" : ""}
              />
            )}
          />

          <MyButton htmlType="submit">Восстановить пароль</MyButton>
        </form>

        <Link to="/login" className={styles.link}>
          Назад
        </Link>
      </div>
    </div>
  );
};
