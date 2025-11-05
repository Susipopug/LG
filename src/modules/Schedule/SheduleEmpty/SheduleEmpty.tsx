import success from "@assets/images/Success.svg";
import styles from "./SheduleEmpty.module.css";

export const SheduleEmpty = () => {
  return (
    <div className={styles.emptySheduleContainer}>
      <img width={200} height={180} src={success} alt="success" />
      <h3>На сегодня всё выполнено</h3>
      <p>Наслаждайтесь отдыхом и не забудьте поделиться своими свершениями</p>
    </div>
  );
};
