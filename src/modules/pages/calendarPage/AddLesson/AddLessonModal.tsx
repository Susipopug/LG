import { useCalendar } from "@/components/context/CalendarContext";
import { MyButton } from "@/components/UI/MyButton";
import type { Lesson } from "@/entities";
import { Controller, useForm } from "react-hook-form";
import styles from "./AddLessonModal.module.css";
import { DatePicker, Input, Modal, Select, Switch, TimePicker } from "antd";
import type { Dayjs } from "dayjs";

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

  const { register, control, watch } = useForm<LessonForm>({
    mode: "onSubmit",
  });
  const isRegular = watch("isRegular");

  return (
    <div className={styles.dialog}>
      <div>
        <Modal
          open={addLesson}
          onOk={onCloseCaledarModal}
          onCancel={onCloseCaledarModal}
          footer={null}
        >
          <form className={styles.dialogForm}>
            <label className={styles.inputLabel}>Ученик</label>
            <Controller
              control={control}
              name="userId"
              render={({ field: { value, onChange } }) => (
                <Select
                  style={{ width: "100%" }}
                  onChange={onChange}
                  value={value}
                  options={students.map((student) => ({
                    value: student.id,
                    label: `${student.firstName} ${student.lastName}`,
                  }))}
                />
              )}
            />

            <div className={styles.formDate}>
              <Controller
                name="date"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DatePicker value={value} onChange={onChange} />
                )}
              />
              <Controller
                name="startTime"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TimePicker
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
                    value={value}
                    onChange={onChange}
                    showSecond={false}
                  />
                )}
              />
            </div>

            {/* changed to the antdesign */}

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
                <label>
                  Регулярность
                  <Select
                    style={{ width: "100%" }}
                    {...register("frequency")}
                    options={[
                      { value: "daily", label: "Ежедневно" },
                      { value: "weekly", label: "Еженедельно" },
                      { value: "monthly", label: "Ежемесячно" },
                    ]}
                  />
                </label>

                {/* <label>
                Недели
                <Select
                  style={{ width: "100%" }}
                  {...register("every")}
                  options={students.map((student) => ({
                    value: student.id,
                    label: `${student.firstName} ${student.lastName}`,
                  }))}
                />
              </label> */}
              </>
            )}
            <label>
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
    </div>
  );
};
