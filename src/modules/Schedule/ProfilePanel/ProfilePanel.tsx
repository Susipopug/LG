import { Button, Stack } from "@mui/material";
import styles from "./ProfilePanel.module.css";
import timeimg from "@/assets/icons/time.svg";
import type React from "react";

interface ProfilePanelProps {
  studentName: string;
  time: string;
}

export const ProfilePanel: React.FC<ProfilePanelProps> = ({
  studentName,
  time,
  
}) => {
  return (
    <div className={styles.panel}>
      <div className={styles.time}>
        <img src={timeimg} alt="time" />
        <span className={styles.timeSpan}>{time}</span>
      </div>
      <div className={styles.profile}>
        <div className={styles.avatarLarge}>Д</div>
        <div className={styles.name}>{studentName}</div>
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
          <Button
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
          </Button>

          <Button
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
          </Button>

          <Button
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
            Отменено
          </Button>
        </div>
      </div>
    </div>
  );
};
