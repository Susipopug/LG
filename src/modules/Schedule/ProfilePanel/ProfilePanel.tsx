import { Button, Stack } from "@mui/material";
import styles from "./ProfilePanel.module.css";
import timeimg from "@/assets/icons/time.svg";
import type React from "react";
import type { SheduleItem } from "@/modules/pages/main/Main";
import { Switcher } from "@/components/UI/Switcher/Switcher";

interface ProfilePanelProps {
  studentName: string;
  time: string;
  selectedItem: SheduleItem | null;
}

export const ProfilePanel: React.FC<ProfilePanelProps> = ({
  studentName,
  time,
  selectedItem,
}) => {
  return (
    <div className={styles.panel}>
      <div className={styles.time}>
        <img src={timeimg} alt="time" />
        <span className={styles.timeSpan}>{time}</span>
      </div>
      <div className={styles.profile}>
        {selectedItem && (
          <div className={styles.avatarLarge}>
            {selectedItem.studentInitials}
          </div>
        )}

        <h4 className={styles.name}>{studentName}</h4>
      </div>
      <div className={styles.commentSection}>
        <p className={styles.comment}>Комментарий к занятию</p>
        <p className={styles.commentText}>
          Нужно уделить больше времени практическим заданиям на следующем
          занятии
        </p>
      </div>
      <div className={styles.statusSection}>
        <h3>Статус занятия</h3>
        <div className={styles.buttons}>
          <Switcher />
          <Switcher label="Пропущено" />
          {/* <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#1677FF",
              fontStyle: "normal",
              fontSize: "inherit",
              textTransform: "none",
            }}
          >
            Проведено
          </Button> */}

          {/* <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#BFBFBF",
              fontStyle: "normal",
              fontSize: "inherit",
              textTransform: "none",
            }}
          >
            Пропущено
          </Button> */}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#FFFFFF",
              color: "#4096FF",
              fontStyle: "normal",
              border: "solid 1px #4096FF",
              fontSize: "inherit",
              textTransform: "none",
            }}
          >
            Перенести занятие
          </Button>
        </div>
      </div>
    </div>
  );
};
