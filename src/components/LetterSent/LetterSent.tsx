import styles from "@components/LetterSent/LetterSent.module.css";
import letter from "@assets/images/letter.svg";
import { Link } from "react-router-dom";
import type React from "react";

export const LetterSent: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerContent}>
        <img src={letter} alt="letter" />
        <h1 className={styles.title}>Письмо отправлено</h1>
        <p>
          Если учётная запись example@mail.ru существует, вам отправят письмо с
          инструкциями по восстановлению пароля. Если письмо не пришло,
          проверьте папку со спамом.
        </p>
        <p>Если письмо не пришло, проверьте папку со спамом.</p>

        <Link to="/login" className={styles.link}>
          Назад
        </Link>
      </div>
    </div>
  );
};
