import styles from "./ProfilePanel.module.css";
import timeimg from "@/assets/icons/time.svg";
import type React from "react";
import { Input, Switch } from "antd";
import { useState } from "react";
import { MyButton } from "@/components/UI/MyButton";
import type { SheduleItem } from "@/components/context/CalendarContext";
import type { EventInput } from "@fullcalendar/core/index.js";

interface ProfilePanelProps {
  studentName: string | undefined;
  time: string;
  selectedItem: EventInput | null;
  description: string;
}

export const ProfilePanel: React.FC<ProfilePanelProps> = ({
  studentName,
  time,
  selectedItem,
  description,
}) => {
  const [activeSwitch, setActiveSwitch] = useState<string | null>(null);
  const [showAdditionalText, setShowAdditionalText] = useState<boolean>(false);

  const handleSwitchChange = (checked: boolean, id: string) => {
    if (checked) {
      setActiveSwitch(id);
      setShowAdditionalText(!!id);
    }
  };

  // const handleSwitchChange = (checked: boolean) => {
  //   console.log(`switch to ${checked}`);
  // };

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
        {/* <p className={styles.comment}>Комментарий</p> */}
        {/* <p className={styles.commentText}>{description}</p> */}
        <label className={styles.commentLabel}>
          Комментарий
          <Input.TextArea
            rows={2}
            placeholder="Текст комментария"
            maxLength={256}
            value={description}
          />
        </label>
      </div>
      <div className={styles.statusSection}>
        <h3>Статус занятия</h3>
        <div className={styles.switches}>
          {switchesToDisplay.map((s) => (
            <div key={s.id} className={styles.panelSwitches}>
              <Switch
                size="small"
                defaultChecked
                id={s.id}
                checked={activeSwitch === s.id}
                onChange={(checked) => handleSwitchChange(checked, s.id)}
              />
              <span>{s.label}</span>
            </div>
          ))}

          {showAdditionalText ? (
            <>
              <span className={styles.statusSectionHelperText}>
                Все занятия можно найти в Календаре
              </span>
              <MyButton
                buttonType="default"
                htmlType="button"
                onClick={handleProfileCancel}
              >
                Отменить выбор
              </MyButton>
            </>
          ) : (
            <MyButton buttonType="default" htmlType="button">
              Перенести занятие
            </MyButton>
          )}
        </div>
      </div>
    </div>
  );
};
