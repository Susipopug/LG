import styles from "./StudentModal.module.css";
import { MyButton } from "@/components/UI/MyButton";
import { useCalendar } from "@/components/context/CalendarContext";
import { Input, InputNumber, Modal, Tabs } from "antd";
import type { IStudent } from "../interfaces/StudentInterface";
import { Controller, useForm } from "react-hook-form";
import { STUDENTS_INFO } from "./constants";
import { useState } from "react";

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

  const [tab, setTab] = useState("1");

  console.log(tab);

  console.log("StudentModal");

  const onChangeTab = (value: string) => {
    setTab(value);
  };

  return (
    <div className={styles.dialog}>
      <Modal
        open={addStudent}
        onOk={onCloseStudentModal}
        onCancel={onCloseStudentModal}
        footer={null}
      >
          <div className={styles.modalHeader}></div>
        <form className={styles.dialogForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.tabs}>
            <Tabs
              onChange={onChangeTab}
              activeKey={tab}
              items={STUDENTS_INFO}
            />
          </div>
          {tab == "1" ? (
            <>
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
                rules={{ required: "Номер телефона обязателен" }}
                control={control}
                render={({ field }) => (
                  <label className={styles.formLabel}>
                    Номер телефона
                    <Input {...field} />
                  </label>
                )}
              />
            </>
          ) : (
            <Controller
              name="lessonsBalance"
              control={control}
              render={({ field }) => (
                <label className={styles.formLabel}>
                  Баланс уроков
                  <InputNumber min={1} defaultValue={1} max={52} {...field} />
                </label>
              )}
            />
          )}

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
