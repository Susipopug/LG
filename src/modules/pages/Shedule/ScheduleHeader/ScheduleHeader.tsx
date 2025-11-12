import styles from "./SheduleHeader.module.css";

const days = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

export const ScheduleHeader = () => {
  const now = new Date();

  const dateString = `${now.getDate().toString().padStart(2, "0")}.${(
    now.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}`;

  const dayString = `${days[now.getDay()]}`;
  return (
    <header className={styles.container}>
      <div className={styles.timeTable}>
        <span className={styles.timeTableToday}>Сегодня</span>
        <div className={styles.timeTableDate}>
          {dateString}
          <span className={styles.timeTableDay}>{dayString}</span>
        </div>
      </div>
    </header>
  );
};
