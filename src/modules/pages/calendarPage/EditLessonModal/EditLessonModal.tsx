import { Input, Modal, Switch } from "antd";
import styles from "./EditLessonModal.module.css";
import { Controller, useForm } from "react-hook-form";
import { MyButton } from "@/components/UI/MyButton";
import time from "@/assets/icons/time.svg";
import { useState } from "react";
import type { Lesson } from "@/entities";
import type { Dayjs } from "dayjs";
import { useCalendarContext } from "@/components/context/CalendarContext";

export interface IEditLesson extends Omit<Lesson, "dateStart" | "dateEnd"> {
  date: Dayjs;
  startTime: Dayjs;
  endTime: Dayjs;
  status: string;
}

export const EditLessonModal = () => {
  const [activeSwitch, setActiveSwitch] = useState<string | null>(null);

  const { editModal, onCloseEditModal, currentEvents,  } = useCalendarContext();

  const { handleSubmit, control, reset } = useForm<IEditLesson>({
    mode: "onSubmit",
  });
  const switches = [
    { id: "default", label: "Проведено" },
    { id: "missed", label: "Пропущено" },
    { id: "cancelled", label: "Отменено" },
  ];

  const switchesToDisplay = activeSwitch
    ? switches.filter((s) => s.id === activeSwitch)
    : switches;

  const handleSwitchChange = (checked: boolean, id: string) => {
    if (checked) {
      setActiveSwitch(id);
    }
  };

    const handleEditModalData = (id: string) => {
    return currentEvents?.map((item) => {
      if (item.id === id) {
        return item.title, item.start, item.end;
      }
      return currentEvents;
    });
  };


  const onSubmit = (data: IEditLesson) => {
    //   handleEditEvent(data);
    //   onCloseCaledarModal();
    reset();
    console.log(data);
  };

  return (
    <div className={styles.dialog}>
      <Modal
        width={440}
        open={editModal}
        onOk={onCloseEditModal}
        onCancel={onCloseEditModal}
        footer={null}
      >
        <div className={styles.modalHeader}></div>
        <form className={styles.dialogForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.time}>
            <img src={time} alt="time" />
            <div>{/* {item.start} */}</div>
          </div>

          <div className={styles.studentName}>
            <img src="" alt="" />
            <span>Student name</span>
          </div>

          <Controller
            name="description"
            control={control}
            render={({ field: { value, onChange } }) => (
              <label className={styles.commentLabel}>
                Комментарий к занятию
                <Input.TextArea
                  rows={4}
                  placeholder="Текст комментария"
                  maxLength={256}
                  value={value}
                  onChange={onChange}
                />
              </label>
            )}
          />

          <div className={styles.switches}>
            {switchesToDisplay.map((s) => (
              <div key={s.id} className={styles.switchItem}>
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

            <MyButton
              buttonType="default"
              htmlType="button"
              onClick={onCloseEditModal}
            >
              Перенести занятие
            </MyButton>

            <MyButton buttonType="default" htmlType="button">
              Удалить занятие
            </MyButton>
          </div>
        </form>
      </Modal>
    </div>
  );
};
