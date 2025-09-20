import styles from "@components/ForgotPassword/ForgotPassword.module.css";
import mag_glass from "@assets/images/mag-glass.svg";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { ILogin, IRegister } from "../interfaces/Inputs";
import { Button, Stack } from "@mui/material";
import { PasswordInput } from "../UI/PasswordInput";

export const RestorePassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IRegister>({
    defaultValues: {},
    mode: "onTouched",
  });

  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

  const onSubmit = (data: ILogin) => {
    console.log(data);
  };
  return (
    <div className={styles.container}>
      <div className={styles.containerContent}>
        <img src={mag_glass} alt="mag_glass" />
        <h1 className={styles.title}>Воccтановить пароль</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {/* Password */}
          <PasswordInput
            {...register("password", {
              required: "Поле необходимо заполнить",
              minLength: {
                value: 8,
                message: "Пароль должен содержать не менее 8 символов",
              },
            })}
            value={passwordValue}
            label="Пароль"
            fullWidth
            size="small"
            helperText={errors.password?.message}
            error={!!errors.password}
          />

          {/* ConfirmPassword */}
          <div className="inputWrapper">
            <PasswordInput
              {...register("confirmPassword", {
                required: "Поле необходимо заполнить",
                validate: (value) =>
                  value === passwordValue || "Пароли не совпадают",
              })}
              value={confirmPasswordValue}
              label="Повтор пароля"
              fullWidth
              size="small"
              helperText={errors.confirmPassword?.message}
              error={!!errors.confirmPassword}
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
              Восстановить пароль
            </Button>
          </Stack>
        </form>

        <Link to="/login" className={styles.link}>
          Назад
        </Link>
      </div>
    </div>
  );
};
