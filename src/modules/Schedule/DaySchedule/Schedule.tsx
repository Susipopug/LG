import styles from "./Schedule.module.css";
import time from "@/assets/icons/time.svg";
import type { SheduleItem, TSheduleStatus } from "@/modules/pages/main/Main";
import instance from "axios";
import { useEffect, useState } from "react";

// type ScheduleStatus = "ожидается";
// enum ScheduleStatus {
//   Cancelled = "CANCELLED",
//   Skipped = "SKIPPED",
//   Conducted = "CONDUCTED",
//   Awaiting = "AWAITING",
// }

// const ScheduleStatus = {
//   Cancelled: "CANCELLED",
//   Skipped: "SKIPPED",
//   Conducted: "CONDUCTED",
//   Awaiting: "AWAITING",
// } as const;

// type TSheduleStatus = (typeof ScheduleStatus)[keyof typeof ScheduleStatus];
// // type TSheduleStatus = keyof typeof ScheduleStatus;

// interface SheduleItem {
//   time: string;
//   studentInitials: string;
//   studentName: string;
//   status: TSheduleStatus;
// }

// const scheduleItems: SheduleItem[] = [
//   {
//     time: "8:00-9:00",
//     studentInitials: "Д",
//     studentName: "Джон Траволта",
//     status: ScheduleStatus.Awaiting,
//   },
//   {
//     time: "9:00-10:00",
//     studentInitials: "Б",
//     studentName: "Брюс Уиллис",
//     status: ScheduleStatus.Awaiting,
//   },
//   {
//     time: "14:00-15:00",
//     studentInitials: "М",
//     studentName: "Майк Тайсон",
//     status: ScheduleStatus.Awaiting,
//   },
//   {
//     time: "14:00-15:00",
//     studentInitials: "П",
//     studentName: "Перис Хилтон",
//     status: ScheduleStatus.Awaiting,
//   },
// ];

// const StatusMap: Record<TSheduleStatus, string> = {
//   [ScheduleStatus.Cancelled]: "Отменено",
//   [ScheduleStatus.Skipped]: "Пропущено",
//   [ScheduleStatus.Conducted]: "Проведено",
//   [ScheduleStatus.Awaiting]: "Ожидается",
// };

interface ScheduleProps {
  onItemClick: (index: number, name: string, time: string) => void;
  scheduleItems: SheduleItem[];
  statusMap: Record<TSheduleStatus, string>;
  selectedIndex: number | null;
}

export const Schedule: React.FC<ScheduleProps> = ({
  onItemClick,
  scheduleItems,
  statusMap,
  selectedIndex,
}) => {
  // const [schedule, setSchedule] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   // Fetch calendar data when component mounts
  //   async function fetchCalendar() {
  //     try {
  //       const response = await instance.get("/calendar");
  //       setSchedule(response.data);
  //     } catch (err: unknown) {
  //       if (err instanceof Error) {
  //         setError(err.message);
  //       } else {
  //         setError('An unexpected error occurred');
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchCalendar();
  // }, []);
  const days = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];

  const now = new Date();
  const timeString = `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")} `;

  const dayString = `${days[now.getDay()]}`;

  return (
    <div className={styles.container}>
      <div className={styles.timeTable}>
        <span className={styles.timeTableToday}>Сегодня</span>
        <div className={styles.timeTableDate}>
          {timeString}
          <span className={styles.timeTableDay}>{dayString}</span>
        </div>
      </div>

      {scheduleItems.map((item, index) => (
        <div
          key={index}
          className={`${styles.item} ${
            selectedIndex === index ? styles.itemSelected : ""
          }`}
          onClick={() => onItemClick(index, item.studentName, item.time)}
        >
          <div className={styles.timeAndStatus}>
            <div className={styles.time}>
              <img src={time} alt="time" />
              <div>{item.time}</div>
            </div>

            <div>{statusMap[item.status]}</div>
          </div>

          <div className={styles.student}>
            <div className={styles.avatar}>{item.studentInitials}</div>
            <div className={styles.name}>{item.studentName}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
