import styles from "@components/ForgotPassword/ForgotPassword.module.css";
import mag_glass from "@assets/images/mag-glass.svg";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { LetterSent } from "../LetterSent/LetterSent";

interface IForgotPassword {
  email: string;
}
export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const {
    register,
    handleSubmit,
    clearErrors,
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
        <img src={mag_glass} alt="mag_glass" />
        <h1 className={styles.title}>Воccтановить пароль</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
