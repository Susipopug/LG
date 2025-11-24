import { useCalendar } from "@/components/context/CalendarContext";
import { MyButton } from "@/components/UI/MyButton";
import type { Lesson } from "@/entities";
import { Controller, useForm } from "react-hook-form";
import styles from "./AddLessonModal.module.css";
import {
  DatePicker,
  Input,
  Modal,
  Select,
  Switch,
  TimePicker,
  InputNumber,
} from "antd";
import type { Dayjs } from "dayjs";
import { useState } from "react";
import dayjs from "dayjs";
import { useAppContext } from "@/components/context/AppContext";
import type { DateSelectArg, EventInput } from "@fullcalendar/core/index.js";

export interface LessonForm
  extends Pick<
    Lesson,
    | "userId"
    | "id"
    | "userName"
    | "isRegular"
    | "description"
    | "frequency"
    | "every"
  > {
  date: Dayjs;
  startTime: Dayjs;
  endTime: Dayjs;
}

export const AddLesson = () => {
  const { addLesson, onCloseCaledarModal, handleAddEvent } = useCalendar();
  const { students } = useAppContext();
  const [value, setValue] = useState<string | number | null>("1");

  const { handleSubmit, control, reset, watch } = useForm<LessonForm>({
    mode: "onSubmit",
  });

  const onSubmit = (data: LessonForm) => {
    handleAddEvent(data.userName, {
      start: data.date.toDate(),
    } as DateSelectArg);
    onCloseCaledarModal();
    reset();
    console.log(data);
  };

  // const { control, watch } = useForm<LessonForm>({
  //   mode: "onSubmit",
  // });
  const isRegular = watch("isRegular");

  return (
    <div className={styles.dialog}>
      <Modal
        width={440}
        open={addLesson}
        onOk={onCloseCaledarModal}
        onCancel={onCloseCaledarModal}
        footer={null}
      >
        <div className={styles.modalHeader}></div>
        <form className={styles.dialogForm} onSubmit={handleSubmit(onSubmit)}>
          {/* вставить в controller */}
          <Controller
            control={control}
            name="userId"
            render={({ field: { value, onChange } }) => (
              <label className={styles.inputLabel}>
                Ученик
                <Select
                  style={{ width: "100%" }}
                  onChange={onChange}
                  value={value}
                  options={students.map((student) => ({
                    id: student.id,
                    value: student.name,
                    label: student.name,
                  }))}
                />
              </label>
            )}
          />

          <div className={styles.formDate}>
            <Controller
              name="date"
              control={control}
              render={({ field: { value, onChange } }) => (
                <DatePicker
                  value={value}
                  // onChange={(date) => {
                  //   setSelectedDate(date); // or your state updater
                  // }}
                  defaultValue={dayjs(new Date())}
                  format={["DD.MM.YYYY"]}
                />
              )}
            />
            <Controller
              name="startTime"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TimePicker
                  defaultValue={dayjs("8:00", "HH:mm")}
                  value={value}
                  onChange={onChange}
                  showSecond={false}
                />
              )}
            />

            <Controller
              name="endTime"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TimePicker
                  defaultValue={dayjs("9:00", "HH:mm")}
                  value={value}
                  onChange={onChange}
                  showSecond={false}
                />
              )}
            />
          </div>

          <Controller
            name="isRegular"
            control={control}
            render={({ field: { value, onChange } }) => (
              <label className={styles.switchLabel} htmlFor="switch">
                <Switch size="small" value={value} onChange={onChange} />
                Сделать занятие регулярным
              </label>
            )}
          />

          {isRegular && (
            <>
              <label className={styles.regularLabel}>
                Регулярность
                <span>Недели</span>
                <InputNumber
                  min={1}
                  defaultValue={1}
                  max={52}
                  value={value}
                  onChange={setValue}
                />
              </label>
            </>
          )}
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

          <MyButton htmlType="submit">Сохранить изменения</MyButton>
          <MyButton
            htmlType="button"
            buttonType="default"
            onClick={onCloseCaledarModal}
          >
            Отмена
          </MyButton>
        </form>
      </Modal>
    </div>
  );
};
