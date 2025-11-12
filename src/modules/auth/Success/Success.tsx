import { Link } from "react-router-dom";
import styles from "./Success.module.css";
import success from "@assets/images/Success.svg";

export const Success = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerContent}>
        <img height={180} width={200} src={success} alt="success" />

        <h1 className={styles.title}>Создать аккаунт</h1>
        <p>Ваш акканут подтвержден</p>
        <Link to={"/login"} className={styles.link}>
          На главную
        </Link>
      </div>
    </div>
  );
};
