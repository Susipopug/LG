import styles from "./Schedule.module.css";
import time from "@/assets/icons/time.svg";
import {
  useCalendarContext,
  type SheduleItem,
  type TSheduleStatus,
} from "@/components/context/CalendarContext";
import type {  EventInput } from "@fullcalendar/core/index.js";
import dayjs, { Dayjs } from "dayjs";

interface ScheduleProps {
  onItemClick: (index: number, name: string|undefined, time: string) => void;
  updatedScheduleItems: EventInput[];
  statusMap: Record<TSheduleStatus, string>;
  selectedIndex: number | null;
}

type DateInput = Date | string | number | number[];

export const Schedule: React.FC<ScheduleProps> = ({
  onItemClick,
  updatedScheduleItems,
  statusMap,
  selectedIndex,
}) => {
  const { currentEvents } = useCalendarContext();

  
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

        const timeString =
          item.start && item.end
            ? `${dayjs(item.start as Date).format("HH:mm")} - ${dayjs(
                item.end as Date
              ).format("HH:mm")}`
            : "Time not set";

        const initials = getInitials(item.title);

        return (
          <section
            key={index}
            className={itemClassName}
            onClick={() => onItemClick(index, item.title, timeString)}
          >
            <div className={styles.timeAndStatus}>
              <div className={styles.time}>
                <img src={time} alt="time" />
                <div>{timeString}</div>
              </div>

              {/* <div>{statusMap[item.status]}</div> */}
            </div>

            <div className={styles.student}>
              <div className={styles.avatar}>{initials}</div>
              <div className={styles.name}>{item.title}</div>
            </div>
          </section>
        );
      })}
    </div>
  );
};
