import styles from "@components/LetterSent/LetterSent.module.css";
import letter from "@assets/images/letter.svg";
import { Button, Input } from "antd";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { ILogin } from "../interfaces/Inputs";
import type React from "react";

export const LetterSent: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ILogin>();

  const onSubmit = (data: ILogin) => console.log(data);
  return (
    <div className={styles.container}>
      <div className={styles.containerContent}>
        <img src={letter} alt="letter" />
        <div className={styles.title}>Письмо отправлено</div>
        <p>
          Если учётная запись example@mail.ru существует, вам отправят письмо с
          инструкциями по восстановлению пароля. Если письмо не пришло,
          проверьте папку со спамом.
        </p>
        <p>Если письмо не пришло, проверьте папку со спамом.</p>

        <Link to="/login">Назад</Link>
      </div>
    </div>
  );
};
