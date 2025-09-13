import { useForm } from "react-hook-form";
import styles from "./Register.module.css";
import hands from "@assets/images/hands.svg";
import google from "@assets/images/google.svg";
import { Button, Input } from "antd";
import { Link } from "react-router";
import { useState } from "react";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const Register: React.FC = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => console.log(data);

  return (
    <div className={styles.container}>
      <div className={styles.containerContent}>
        <img src={hands} alt="hands" />
        <div className={styles.title}>Создать аккаунт</div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className="inputWrapper">
            {inputValue.email && (
              <div className={styles.labelAbove}>Адрес электронной почты</div>
            )}
            <Input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Адрес электронной почты"
              name="email"
              allowClear
              onChange={(e) =>
                setInputValue({ ...inputValue, email: e.target.value })
              }
              value={inputValue.email}
            />
          </div>
          <div className="inputWrapper">
            {inputValue.password && (
              <div className={styles.labelAbove}>Пароль</div>
            )}
            <Input.Password
              {...register("password", { required: "Password is required" })}
              type="password"
              placeholder="Пароль"
              name="password"
              allowClear
              minLength={8}
              onChange={(e) =>
                setInputValue({ ...inputValue, password: e.target.value })
              }
              value={inputValue.password}
            />
          </div>

          <div className="inputWrapper">
            {inputValue.confirmPassword && (
              <div className={styles.labelAbove}>Повтор пароля</div>
            )}
            <Input.Password
              {...register("password", { required: "Password is required" })}
              type="password"
              placeholder="Повтор пароля"
              name="confirmPassword"
              allowClear
              minLength={8}
              onChange={(e) =>
                setInputValue({
                  ...inputValue,
                  confirmPassword: e.target.value,
                })
              }
              value={inputValue.confirmPassword}
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
