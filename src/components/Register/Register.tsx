import { useForm } from "react-hook-form";
import styles from "./Register.module.css";
import hands from "@assets/images/hands.svg";
import google from "@assets/images/google.svg";
import { Button, Input } from "antd";
import { Link } from "react-router";
import type { IRegister } from "@components/interfaces/Inputs";
import { useEffect } from "react";

// type Inputs = {
//   email: string;
//   password: string;
//   confirmPassword: string;
// };

export const Register: React.FC = () => {
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

  const onSubmit = (data: IRegister) => console.log(data);

  // const watchedEmail = watch("email");
  // const watchedPassword = watch("password");
  // const watchedConfirmPassword = watch("confirmPassword");

  const allValues = watch();
  const { email, password, confirmPassword } = allValues;
  console.log(allValues); // This should now log values correctly

  useEffect(() => {
    const subscription = watch((value) => {
      console.log("Form values changed:", value);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.containerContent}>
        <img src={hands} alt="hands" />
        <div className={styles.title}>Создать аккаунт</div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className="inputWrapper">
            {email && (
              <div className={styles.labelAbove}>Адрес электронной почты</div>
            )}
            <Input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              placeholder="Адрес электронной почты"
              name="email"
              allowClear
            />
          </div>
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
            Зарегистрироваться
          </Button>
        </form>
        <div className={styles.separator}> или</div>
        <button className={styles.googleButton}>
          <img src={google} alt="Google" className={styles.googleIcon} />
          Google
        </button>
        {/* <div className={styles.forgot}>Уже есть аккаунт</div> */}
        <Link to={"/login"}>Уже есть аккаунт</Link>
      </div>
    </div>
  );
};
