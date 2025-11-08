import styles from "./ProfilePanel.module.css";
import timeimg from "@/assets/icons/time.svg";
import type React from "react";
import { Switcher } from "@/components/UI/Switcher/Switcher";
import { useState } from "react";
import { MyButton } from "@/components/UI/Button";
import type { SheduleItem } from "../SheduleAndPanel/SheduleAndPanel";

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
  const [activeSwitch, setActiveSwitch] = useState<string | null>(null);
  const [showAdditionalText, setShowAdditionalText] = useState<boolean>(false);

  const handleSwitchChange = (id: string) => {
    setActiveSwitch(id);
    setShowAdditionalText(!!id);
  };

  const handleProfileCancel = () => {
    setActiveSwitch(null);
    setShowAdditionalText(false);
  };

  const switches = [
    { id: "default", label: "Проведено" },
    { id: "missed", label: "Пропущено" },
    { id: "cancelled", label: "Отменено" },
  ];

  const switchesToDisplay = activeSwitch
    ? switches.filter((s) => s.id === activeSwitch)
    : switches;

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
          {switchesToDisplay.map((s) => (
            <Switcher
              key={s.id}
              id={s.id}
              label={s.label}
              checked={activeSwitch === s.id}
              onChange={handleSwitchChange}
            />
          ))}

          {showAdditionalText ? (
            <>
              <span className={styles.statusSectionHelperText}>
                Все занятия можно найти в Календаре
              </span>
              <MyButton
                type="button"
                onClick={handleProfileCancel}
                border="solid 1px #4096FF"
                color="#4096FF"
                backgroundColor="#FFFFFF"
              >
                Отменить выбор
              </MyButton>
            </>
          ) : (
            <MyButton
              type="button"
              border="solid 1px #4096FF"
              color="#4096FF"
              backgroundColor="#FFFFFF"
            >
              Перенести занятие
            </MyButton>
          )}
        </div>
      </div>
    </div>
  );
};
