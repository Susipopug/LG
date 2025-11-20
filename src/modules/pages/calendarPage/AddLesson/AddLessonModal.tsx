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

interface LessonForm

  // to change to omit
  extends Pick<
    Lesson,
    "userId" | "isRegular" | "description" | "frequency" | "every"
  > {
  date: Dayjs;
  startTime: Dayjs;
  endTime: Dayjs;
}

export const AddLesson = () => {
  const { addLesson, onCloseCaledarModal, students } = useCalendar();
  const [value, setValue] = useState<string | number | null>("1");

  const { control, watch } = useForm<LessonForm>({
    mode: "onSubmit",
  });
  const isRegular = watch("isRegular");

  return (
    <div className={styles.dialog}>
      <Modal
        open={addLesson}
        onOk={onCloseCaledarModal}
        onCancel={onCloseCaledarModal}
        footer={null}
      >
        <div className={styles.modalHeader}></div>
        <form className={styles.dialogForm}>
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
                    value: student.id,
                    label: `${student.firstName} ${student.lastName}`,
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
                  onChange={onChange}
                  defaultValue={dayjs("01.01.2015")}
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
          <label className={styles.commentLabel}>
            Комментарий к занятию
            <Input.TextArea
              rows={4}
              placeholder="Текст комментария"
              maxLength={256}
            />
          </label>

          <MyButton htmlType="submit" onClick={onCloseCaledarModal}>
            Сохранить изменения
          </MyButton>
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
