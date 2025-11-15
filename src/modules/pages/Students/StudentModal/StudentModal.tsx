import styles from "./StudentModal.module.css";
import { MyButton } from "@/components/UI/Button";
import { useCalendar } from "@/components/context/CalendarContext";
import { Input, Modal } from "antd";

export const StudentModal = () => {
  const { onCloseStudentModal, addStudent } = useCalendar();

  return (
    <div className={styles.dialog}>
      <Modal
        open={addStudent}
        onOk={onCloseStudentModal}
        onCancel={onCloseStudentModal}
        footer={null}
      >
        <form className={styles.dialogForm}>
          <label className={styles.formLabel}>
            Имя
            <Input />
          </label>

          <label className={styles.formLabel}>
            Комментарий
            <Input.TextArea
              rows={4}
              placeholder="Текст комментария"
              maxLength={256}
            />
          </label>
          <label className={styles.formLabel}>
            Telegram
            <Input />
          </label>
          <label className={styles.formLabel}>
            Whatsapp
            <Input />
          </label>
          <label>
            Номер телефона
            <Input />
          </label>
        </form>
        <MyButton
          buttonType="primary"
          htmlType="submit"
          onClick={onCloseStudentModal}
        >
          Сохранить изменения
        </MyButton>
        <MyButton
          buttonType="default"
          htmlType="submit"
          onClick={onCloseStudentModal}
        >
          Удалить ученика
        </MyButton>
      </Modal>
    </div>
  );
};
