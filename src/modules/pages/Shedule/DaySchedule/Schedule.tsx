import styles from "./Schedule.module.css";
import time from "@/assets/icons/time.svg";
import type {} from "@/modules/pages/main/Main";
import type {
  SheduleItem,
  TSheduleStatus,
} from "@/components/context/CalendarContext";

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
  return (
    <div className={styles.schedule}>
      {updatedScheduleItems.map((item, index) => {
        const isFirstItem = index === 0;
        const isSelected = selectedIndex === index;

        const itemClassName = [
          styles.item,
          isSelected ? styles.selected : "",
          isFirstItem ? styles.first : "", // Apply styles for first selected item
        ].join(" ");

        return (
          <section
            key={index}
            className={itemClassName}
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
          </section>
        );
      })}
    </div>
  );
};
