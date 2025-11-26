import styles from "./Schedule.module.css";
import time from "@/assets/icons/time.svg";
import {
  useCalendarContext,
  type SheduleItem,
  type TSheduleStatus,
} from "@/components/context/CalendarContext";
import type { DateInput } from "@fullcalendar/core/index.js";
import dayjs from "dayjs";

interface ScheduleProps {
  onItemClick: (index: number, name: string, time: string) => void;
  updatedScheduleItems: SheduleItem[];
  statusMap: Record<TSheduleStatus, string>;
  selectedIndex: number | null;
}

export const Schedule: React.FC<ScheduleProps> = ({
  onItemClick,
  updatedScheduleItems,
  statusMap,
  selectedIndex,
}) => {
  const { currentEvents } = useCalendarContext();

  // Format the time for display - handles all DateInput types
  const formatEventTime = (
    start: string | Date | number[],
    end: string | Date | number[]
  ) => {
    if (!start || !end) {
      return "Time not set";
    }

    try {
      // Convert DateInput to proper format for dayjs
      // const startDate = typeof start === "number" ? new Date(start) : start;
      // const endDate = typeof end === "number" ? new Date(end) : end;

      const startTime = dayjs(startDate).format("HH:mm");
      const endTime = dayjs(endDate).format("HH:mm");
      return `${startTime} - ${endTime}`;
    } catch (error) {
      console.error("Error formatting time:", error);
      return "Invalid time";
    }
  };

  // Get initials from title (student name)
  const getInitials = (name: string | undefined) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  return (
    <div className={styles.schedule}>
      {currentEvents.map((item, index) => {
        const isFirstItem = index === 0;
        const isSelected = selectedIndex === index;

        const itemClassName = [
          styles.item,
          isSelected ? styles.selected : "",
          isFirstItem ? styles.first : "", // Apply styles for first selected item
        ].join(" ");

        const timeString = formatEventTime(item.start, item.end);
        const initials = getInitials(item.title);

        return (
          <section
            key={index}
            className={itemClassName}
            onClick={() => onItemClick(index, item.studentName, item.time)}
          >
            <div className={styles.timeAndStatus}>
              <div className={styles.time}>
                <img src={time} alt="time" />
                <div>{item.start}</div>
              </div>

              {/* <div>{statusMap[item.status]}</div> */}
            </div>

            <div className={styles.student}>
              <div className={styles.avatar}>{item.initials}</div>
              <div className={styles.name}>{item.title}</div>
            </div>
          </section>
        );
      })}
    </div>
  );
};
