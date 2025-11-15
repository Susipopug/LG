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
      <main className={styles.scheduleMain}>
        <h2 className={styles.visuallyHidden}>Главная страница</h2>
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
      </main>
    </>
  );
};
