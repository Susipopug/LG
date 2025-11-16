import {
  Controller,
  useForm,
  type FieldErrors,
  type SubmitHandler,
} from "react-hook-form";
import styles from "./Register.module.css";
import hands from "@assets/images/hands.svg";
import { Link } from "react-router-dom";
import { GoogleButton } from "../../../components/UI/GoogleButton/GoogleButton";
import { Input } from "antd";
import { MyButton } from "@/components/UI/MyButton";

interface IRegister {
  email: string;
  password: string;
  confirmPassword: string;
}

export const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<IRegister>({
    mode: "onSubmit",
  });

  const passwordValue = watch("password");

  const onSubmit: SubmitHandler<IRegister> = (data) =>
    console.log("submited data", data);

  const onError = (errors: FieldErrors<IRegister>) => {
    console.log("Form errors:", errors);
  };
  console.log(watch("password"));

  return (
    <div className={styles.container}>
      <div className={styles.containerContent}>
        <img height={180} width={200} src={hands} alt="hands" />

        <h1 className={styles.title}>Создать аккаунт</h1>

        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className={styles.form}
        >
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
          <MyButton htmlType="submit">Зарегистрироваться</MyButton>
        </form>

        <GoogleButton />
        <Link to={"/login"} className={styles.link}>
          Уже есть аккаунт
        </Link>
      </div>
    </div>
  );
};
