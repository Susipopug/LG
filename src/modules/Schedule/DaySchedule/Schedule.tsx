import styles from "./Schedule.module.css";

// type ScheduleStatus = "ожидается";
enum ScheduleStatus {
  Cancelled = "CANCELLED",
  Skipped = "SKIPPED",
  Conducted = "CONDUCTED",
  Awaiting = "AWAITING",
}

// type TSheduleStatus = keyof typeof ScheduleStatus;

interface SheduleItem {
  time: string;
  studentInitials: string;
  studentName: string;
  status: ScheduleStatus;
}

const scheduleItems: SheduleItem[] = [
  {
    time: "8:00-9:00",
    studentInitials: "Д",
    studentName: "Джон Траволта",
    status: ScheduleStatus.Awaiting,
  },
  {
    time: "9:00-10:00",
    studentInitials: "Б",
    studentName: "Брюс Уиллис",
    status: ScheduleStatus.Awaiting,
  },
  {
    time: "14:00-15:00",
    studentInitials: "М",
    studentName: "Майк Тайсон",
    status: ScheduleStatus.Awaiting,
  },
  {
    time: "14:00-15:00",
    studentInitials: "П",
    studentName: "Перис Хилтон",
    status: ScheduleStatus.Awaiting,
  },
];

const StatusMap: Record<ScheduleStatus, string> = {
  [ScheduleStatus.Cancelled]: "Отменено",
  [ScheduleStatus.Skipped]: "Пропущено",
  [ScheduleStatus.Conducted]: "Проведено",
  [ScheduleStatus.Awaiting]: "Ожидается",
};

// const Result = StatusMap[scheduleItems[0].status];

// const getStatusClass = (status) => {
//   switch (status) {
//     case "подтвержден":
//       return styles.statusConfirmed;
//     case "ожидается":
//       return styles.statusPending;
//     case "отменено":
//       return styles.statusCancelled;
//     default:
//       return "";
//   }
// };

export const Schedule = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>10.09 пятница</div>
      {scheduleItems.map((item, index) => (
        <div key={index} className={styles.item}>
          <div className={styles.timeAndStatus}>
            <div className={styles.time}>{item.time}</div>
            <div>{StatusMap[item.status]}</div>
          </div>

          <div className={styles.student}>
            <div className={styles.avatar}>{item.studentInitials}</div>
            <div className={styles.name}>{item.studentName}</div>
          </div>

          {/* <div
            className={`${styles.status} 
          ${getStatusClass(item.status)}`}
          >
        
            {item.status === "подтвержден" ? "✔️" : "⏳"}
          </div> */}
        </div>
      ))}
    </div>
  );
};
