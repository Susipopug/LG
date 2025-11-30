import styles from "./SheduleAndPanel.module.css";
import { useState } from "react";
import { SheduleEmpty } from "../SheduleEmpty/SheduleEmpty";
import { Schedule } from "../DaySchedule/Schedule";
import { useCalendarContext } from "@/components/context/CalendarContext";
import { ScheduleHeader } from "../ScheduleHeader";
import { ProfilePanel } from "../ProfilePanel";
import type { EventInput } from "@fullcalendar/core/index.js";
import dayjs from "dayjs";

interface SelectedStudent {
  name: string | undefined;
  time: string;
  description: string;
}

export const SheduleAndPanel: React.FC = () => {
  const { currentEvents, StatusMap } = useCalendarContext();

  const updatedScheduleItems: EventInput[] = currentEvents.map((item) => {
    const startTime = item.start
      ? dayjs(item.start as Date).format("HH:mm")
      : "";
    const endTime = item.end ? dayjs(item.end as Date).format("HH:mm") : "";
    const timeString = `${startTime} - ${endTime} `;

    return {
      ...item,
      studentInitials: item.title?.charAt(0),
      description: item.extendedProps?.description || '',
      time: timeString,
    };
  });

  const [selectedStudent, setSelectedStudent] = useState<SelectedStudent>(
    updatedScheduleItems.length > 0
      ? {
          name: updatedScheduleItems[0].title || "",
          time: updatedScheduleItems[0].time,
          description: updatedScheduleItems[0].description || "",
        }
      : { name: "", time: "", description: "" }
  );

  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

  const selectedItem =
    selectedIndex !== null ? updatedScheduleItems[selectedIndex] : null;

  const handleItemClick = (
    index: number,
    name: string | undefined,
    time: string
  ): void => {
    setSelectedIndex(index);
    const item = updatedScheduleItems[index];
    setSelectedStudent({ name, time, description: item.description });
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
              description={selectedStudent.description}
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
