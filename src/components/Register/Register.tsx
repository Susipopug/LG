import { useForm, type FieldErrors, type SubmitHandler } from "react-hook-form";
import styles from "./Register.module.css";
import hands from "@assets/images/hands.svg";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { GoogleButton } from "../UI/GoogleButton/GoogleButton";
import { PasswordInput } from "../UI/PasswordInput";

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
    clearErrors,
    formState: { errors },
  } = useForm<IRegister>({
    mode: "onSubmit",
  });

  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

  const onSubmit: SubmitHandler<IRegister> = (data) =>
    console.log("submited data", data);

  const onError = (errors: FieldErrors<IRegister>) => {
    console.log("Form errors:", errors);
  };
  console.log(watch("password"));

  return (
    <div className={styles.container}>
      <div className={styles.containerContent}>
        <img src={hands} alt="hands" />

        <h1 className={styles.title}>Создать аккаунт</h1>

        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className={styles.form}
        >
          {/* Email */}
          <TextField
            {...register("email", {
              required: "Поле необходимо заполнить",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Неверный адрес электронной почты",
              },
            })}
            type="email"
            fullWidth
            size="small"
            label="Адрес электронной почты"
            helperText={errors.email?.message}
            error={!!errors.email}
            // onChange={() => clearErrors("email")}
            slotProps={{
              inputLabel: {
                sx: {
                  color: "grey.400",
                },
              },
            }}
          />

          {/* Password */}
          <PasswordInput
            {...register("password", {
              required: "Поле необходимо заполнить",
              minLength: {
                value: 8,
                message: "Пароль должен содержать не менее 8 символов",
              },
            })}
            // value={passwordValue}
            // value={watch("password") || ""}
            label="Пароль"
            fullWidth
            size="small"
            helperText={errors.password?.message}
            error={!!errors.password}
            // onChange={() => clearErrors("password")}
          />

          {/* ConfirmPassword */}
          <div className="inputWrapper">
            <PasswordInput
              {...register("confirmPassword", {
                required: "Поле необходимо заполнить",
                validate: (value) =>
                  value === passwordValue || "Пароли не совпадают",
              })}
              // value={confirmPasswordValue}
              label="Повтор пароля"
              fullWidth
              size="small"
              helperText={errors.confirmPassword?.message}
              error={!!errors.confirmPassword}
              // onChange={() => clearErrors("confirmPassword")}
            />
          </div>

          <Stack direction="row" spacing={2}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#1677FF",
                fontStyle: "normal",
                fontSize: "inherit",
                textTransform: "none",
              }}
            >
              Зарегистрироваться
            </Button>
          </Stack>
        </form>

        <GoogleButton />
        <Link to={"/login"} className={styles.link}>
          Уже есть аккаунт
        </Link>
      </div>
    </div>
  );
};
