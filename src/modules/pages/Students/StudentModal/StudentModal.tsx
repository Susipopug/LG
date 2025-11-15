import styles from "./StudentModal.module.css";
import { MyButton } from "@/components/UI/Button";
import { useCalendar } from "@/components/context/CalendarContext";
import { Input, Modal } from "antd";
import type { IStudent } from "../interfaces/StudentInterface";
import { Controller, useForm } from "react-hook-form";

interface studentModalProps {
  onAddNewStudent: (student: IStudent) => void;
}

export const StudentModal = ({ onAddNewStudent }: studentModalProps) => {
  const { onCloseStudentModal, addStudent } = useCalendar();

  const { handleSubmit, control, reset } = useForm<IStudent>({
    mode: "onSubmit",
  });

  const onSubmit = (data: IStudent) => {
    onAddNewStudent(data);
    onCloseStudentModal();
    reset();
    console.log(data);
  };

  return (
    <div className={styles.dialog}>
      <Modal
        open={addStudent}
        onOk={onCloseStudentModal}
        onCancel={onCloseStudentModal}
        footer={null}
      >
        <form className={styles.dialogForm} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            rules={{ required: "Имя обязательно" }}
            control={control}
            render={({ field, fieldState }) => (
              <>
                <label className={styles.formLabel}>
                  Имя
                  <Input {...field} />
                </label>
                {fieldState.error && (
                  <p style={{ color: "red" }}>{fieldState.error.message}</p>
                )}
              </>
            )}
          />

          <Controller
            name="comment"
            control={control}
            render={({ field }) => (
              <label className={styles.formLabel}>
                Комментарий
                <Input.TextArea
                  rows={4}
                  placeholder="Текст комментария"
                  maxLength={256}
                  {...field}
                />
              </label>
            )}
          />

          <Controller
            name="telegram"
            control={control}
            render={({ field }) => (
              <label className={styles.formLabel}>
                Telegram
                <Input {...field} />
              </label>
            )}
          />

          <Controller
            name="whatsapp"
            control={control}
            render={({ field }) => (
              <label className={styles.formLabel}>
                Whatsapp
                <Input {...field} />
              </label>
            )}
          />

          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <label className={styles.formLabel}>
                Номер телефона
                <Input {...field} />
              </label>
            )}
          />
          <MyButton buttonType="primary" htmlType="submit">
            Сохранить изменения
          </MyButton>
          <MyButton
            buttonType="default"
            htmlType="button"
            onClick={onCloseStudentModal}
          >
            Удалить ученика
          </MyButton>
        </form>
      </Modal>
    </div>
  );
};
