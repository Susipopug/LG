import styles from "@components/ForgotPassword/ForgotPassword.module.css";
import mag_glass from "@assets/images/mag-glass.svg";
import { Button, Input } from "antd";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { ILogin, IRegister } from "../interfaces/Inputs";
import { useEffect } from "react";

export const RestorePassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IRegister>({
    defaultValues: {
      // Add default values
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur", // Optional: validate on change
  });

  const allValues = watch();
  const { email, password, confirmPassword } = allValues;
  console.log(allValues); // This should now log values correctly

  useEffect(() => {
    const subscription = watch((value) => {
      console.log("Form values changed:", value);
    });
    return () => subscription.unsubscribe();
  }, []);

  const onSubmit = (data: ILogin) => console.log(data);
  return (
    <div className={styles.container}>
      <div className={styles.containerContent}>
        <img src={mag_glass} alt="mag_glass" />
        <div className={styles.title}>Воccтановить пароль</div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className="inputWrapper">
            {password && <div className={styles.labelAbove}>Пароль</div>}
            <Input.Password
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              type="password"
              placeholder="Пароль"
              name="password"
              allowClear
              // minLength={8}
            />
          </div>

          <div className="inputWrapper">
            {confirmPassword && (
              <div className={styles.labelAbove}>Повтор пароля</div>
            )}
            <Input.Password
              {...register("password", {
                required: "Password is required",
                validate: (value) =>
                  value === confirmPassword || "Passwords do not match",
              })}
              type="password"
              placeholder="Повтор пароля"
              name="confirmPassword"
              allowClear
            />
          </div>
          <Button type="primary" htmlType="submit">
            Изменить пароль
          </Button>
        </form>

        <Link to="/login">Назад</Link>
      </div>
    </div>
  );
};
