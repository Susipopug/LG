import styles from "@components/ForgotPassword/ForgotPassword.module.css";
import mag_glass from "@assets/images/mag-glass.svg";
import { Input } from "antd";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { ILogin } from "../interfaces/Inputs";
import { Button, Stack, TextField } from "@mui/material";

export const ForgotPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    mode: "onTouched",
  });

  const onSubmit = (data: ILogin) => console.log(data);
  return (
    <div className={styles.container}>
      <div className={styles.containerContent}>
        <img src={mag_glass} alt="mag_glass" />
        <h1 className={styles.title}>Воccтановить пароль</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className="inputWrapper">
            {/* {email && (
                       <div className={styles.labelAbove}>Адрес электронной почты</div>
                     )} */}
            <TextField
              {...register("email", {
                required: "Поле необходимо заполнить",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Неверный адрес электронной почты",
                },
              })}
              type="email"
              // placeholder="Адрес электронной почты"
              fullWidth
              size="small"
              label="Адрес электронной почты"
              slotProps={{
                inputLabel: {
                  sx: {
                    color: "grey.400", // Light grey color
                  },
                },
              }}
            />
            {errors.email && (
              <p role="alert" style={{ color: "red" }}>
                {errors.email.message}
              </p>
            )}
          </div>

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#1677FF",
                fontStyle: "normal",
                fontSize: "inherit",
                textTransform: "none",
              }}
            >
              Отправить запрос
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
