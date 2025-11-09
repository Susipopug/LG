import styles from "./SheduleAndPanel.module.css";
import { useState } from "react";
import { SheduleEmpty } from "../SheduleEmpty/SheduleEmpty";
import { ScheduleHeader } from "../ScheduleHeader/ScheduleHeader";
import { ProfilePanel } from "../ProfilePanel/ProfilePanel";
import { Schedule } from "../DaySchedule/Schedule";
import { useCalendar } from "@/components/context/CalendarContext";

interface SelectedStudent {
  name: string;
  time: string;
}

// const ScheduleStatus = {
//   Cancelled: "CANCELLED",
//   Skipped: "SKIPPED",
//   Conducted: "CONDUCTED",
//   Awaiting: "AWAITING",
// } as const;

// export type TSheduleStatus =
//   (typeof ScheduleStatus)[keyof typeof ScheduleStatus];
// type TSheduleStatus = keyof typeof ScheduleStatus;

// export interface SheduleItem {
//   time: string;
//   studentInitials: string;
//   studentName: string;
//   status: TSheduleStatus;
// }

// const scheduleItems: SheduleItem[] = [
//   {
//     time: "8:00 - 9:00",
//     studentInitials: "Д",
//     studentName: "Джон Траволта",
//     status: ScheduleStatus.Awaiting,
//   },
//   {
//     time: "9:00 - 10:00",
//     studentInitials: "Б",
//     studentName: "Брюс Уиллис",
//     status: ScheduleStatus.Awaiting,
//   },
//   {
//     time: "14:00 - 15:00",
//     studentInitials: "М",
//     studentName: "Майк Тайсон",
//     status: ScheduleStatus.Awaiting,
//   },
//   {
//     time: "14:00 - 15:00",
//     studentInitials: "П",
//     studentName: "Перис Хилтон",
//     status: ScheduleStatus.Awaiting,
//   },
// ];

// const updatedScheduleItems: SheduleItem[] = scheduleItems.map((item) => ({
//   ...item,
//   studentInitials: item.studentName.charAt(0),
// }));

// const StatusMap: Record<TSheduleStatus, string> = {
//   [ScheduleStatus.Cancelled]: "Отменено",
//   [ScheduleStatus.Skipped]: "Пропущено",
//   [ScheduleStatus.Conducted]: "Проведено",
//   [ScheduleStatus.Awaiting]: "Ожидается",
// };

export const SheduleAndPanel: React.FC = () => {
  const { updatedScheduleItems, StatusMap } = useCalendar();

  const [selectedStudent, setSelectedStudent] = useState<SelectedStudent>(
    updatedScheduleItems.length > 0
      ? {
          name: updatedScheduleItems[0].studentName,
          time: updatedScheduleItems[0].time,
        }
      : { name: "", time: "" }
  );

  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

  const selectedItem =
    selectedIndex !== null ? updatedScheduleItems[selectedIndex] : null;

  const handleItemClick = (index: number, name: string, time: string): void => {
    setSelectedIndex(index);
    setSelectedStudent({ name, time });
  };

  return (
    <>
      <ScheduleHeader />
      <div className={styles.scheduleMain}>
        {updatedScheduleItems.length > 0 ? (
          <>
            <Schedule
              onItemClick={handleItemClick}
              updatedScheduleItems={updatedScheduleItems}
              statusMap={StatusMap}
              selectedIndex={selectedIndex}
            />
            <ProfilePanel
              studentName={selectedStudent.name}
              time={selectedStudent.time}
              selectedItem={selectedItem}
            />
          </>
        ) : (
          <SheduleEmpty />
        )}
      </div>
    </>
  );
};
