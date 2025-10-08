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

  const dateString = `${(now.getMonth() + 1).toString().padStart(2, "0")}.${now
    .getDate()
    .toString()
    .padStart(2, "0")}`;

  const dayString = `${days[now.getDay()]}`;
  return (
    <div className={styles.container}>
      <div className={styles.timeTable}>
        <span className={styles.timeTableToday}>Сегодня</span>
        <div className={styles.timeTableDate}>
          {dateString}
          <span className={styles.timeTableDay}>{dayString}</span>
        </div>
      </div>
    </div>
  );
};
