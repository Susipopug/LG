import { Input, Modal, Switch } from "antd";
import styles from "./EditLessonModal.module.css";
import { Controller, useForm } from "react-hook-form";
import { MyButton } from "@/components/UI/MyButton";
import time from "@/assets/icons/time.svg";
import { useEffect, useState } from "react";
import type { Lesson } from "@/entities";
import type { Dayjs } from "dayjs";
import { useCalendarContext } from "@/components/context/CalendarContext";
import dayjs from "dayjs";

export interface IEditLesson extends Omit<Lesson, "dateStart" | "dateEnd"> {
  date: Dayjs;
  startTime: Dayjs;
  endTime: Dayjs;
  status: string;
}

export const EditLessonModal = () => {
  const [activeSwitch, setActiveSwitch] = useState<string | null>(null);

  const {
    editModal,
    onCloseEditModal,
    currentEvents,
    selectedEvent,
    setSelectedEvent,
  } = useCalendarContext();

  const { handleSubmit, control, reset, setValue } = useForm<IEditLesson>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (selectedEvent && editModal) {
      const eventDef = selectedEvent._def;
      const extendedProps = eventDef.extendedProps;

      // Преобразуем даты из FullCalendar в Dayjs
      const start = dayjs(selectedEvent.start);
      const end = dayjs(selectedEvent.end);

      // Заполняем форму данными из события
      setValue("userName", eventDef.title || "");
      setValue("description", extendedProps?.description || "");
      setValue("date", start);
      setValue("startTime", start);
      setValue("endTime", end);

      // Установите статус если он есть в extendedProps
      if (extendedProps?.status) {
        setActiveSwitch(extendedProps.status);
      }
    }
  }, [selectedEvent, editModal, setValue]);

  const formatTime = (date: Date | Dayjs) => {
    return dayjs(date).format("HH:mm");
  };

  const formatDate = (date: Date | Dayjs) => {
    return dayjs(date).format("DD.MM.YYYY");
  };

  // Функция для получения времени урока
  const getLessonTime = () => {
    if (!selectedEvent) return "";

    const start = selectedEvent.start;
    const end = selectedEvent.end;

    return `${formatTime(start)} - ${formatTime(end)}`;
  };

  // Функция для получения даты урока
  const getLessonDate = () => {
    if (!selectedEvent) return "";
    return formatDate(selectedEvent.start);
  };

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

  const handleClose = () => {
    setSelectedEvent(null);
    onCloseEditModal();
    reset();
    setActiveSwitch(null);
  };

  const onSubmit = (data: IEditLesson) => {
    console.log("updated data", data);
    if (selectedEvent) {
      selectedEvent.setProp("title", data.userName);
      selectedEvent.setExtendedProp("description", data.description);
      selectedEvent.setExtendedProp("status", activeSwitch);
    }
    handleClose();
    reset();
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
            <div>{getLessonTime()}</div>
          </div>

          <div className={styles.studentName}>
            <img src="" alt="" />
            <span>{selectedEvent?._def?.title || "Неизвестный ученик"}</span>
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
              onClick={handleClose}
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
