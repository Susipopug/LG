import { Schedule } from "@/modules/Schedule/DaySchedule/Schedule";
import Sidebar from "@/modules/Schedule/Sidebar/Sidebar";
import styles from "./Main.module.css";
import { ProfilePanel } from "@/modules/Schedule/ProfilePanel/ProfilePanel";
import { useState } from "react";

interface SelectedStudent {
  name: string;
  time: string;
}

const ScheduleStatus = {
  Cancelled: "CANCELLED",
  Skipped: "SKIPPED",
  Conducted: "CONDUCTED",
  Awaiting: "AWAITING",
} as const;

export type TSheduleStatus =
  (typeof ScheduleStatus)[keyof typeof ScheduleStatus];
// type TSheduleStatus = keyof typeof ScheduleStatus;

export interface SheduleItem {
  time: string;
  studentInitials: string;
  studentName: string;
  status: TSheduleStatus;
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

const StatusMap: Record<TSheduleStatus, string> = {
  [ScheduleStatus.Cancelled]: "Отменено",
  [ScheduleStatus.Skipped]: "Пропущено",
  [ScheduleStatus.Conducted]: "Проведено",
  [ScheduleStatus.Awaiting]: "Ожидается",
};

export const Main: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<SelectedStudent>(
    scheduleItems.length > 0
      ? { name: scheduleItems[0].studentName, time: scheduleItems[0].time }
      : { name: "", time: "" }
  );

  const handleItemClick = (name: string, time: string): void => {
    setSelectedStudent({ name, time });
  };

  return (
    <>
      <div className={styles.main}>
        <Sidebar />
        <div className={styles.schedule}>
          <Schedule
            onItemClick={handleItemClick}
            scheduleItems={scheduleItems}
            statusMap={StatusMap}
          />
          <ProfilePanel
            studentName={selectedStudent.name}
            time={selectedStudent.time}
          />
        </div>
      </div>
    </>
  );
};
