import {
  Dialog,
  DialogActions,
  DialogContent,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import styles from "./StudentModal.module.css";
import { MyButton } from "@/components/UI/Button";
import { useState, type ChangeEvent } from "react";
import { useCalendar } from "@/components/context/CalendarContext";
import { MUI_Input } from "@/components/UI/MUI_Input/MUI_Input";

export const StudentModal = () => {
  const { onCloseStudentModal, addStudent, students } = useCalendar();
  const [title, setTitle] = useState("");
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    if (value.length <= 256) {
      setTitle(value);
    } else {
      setTitle(value.slice(0, 256));
    }
  };
  return (
    <div className="dialog">
      <Dialog open={addStudent} onClose={onCloseStudentModal}>
        <DialogContent>
          <form className="dialogForm">
            <InputLabel className="inputLabel">Имя</InputLabel>
            <MUI_Input />

            <div className={styles.formDate}></div>

            <InputLabel className="inputLabel">Комментарий</InputLabel>
            <TextField
              autoFocus
              margin="dense"
              multiline
              label="Текст комментария"
              fullWidth
              value={title}
              onChange={handleChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <MyButton
            type="submit"
            color="#FFFFFF"
            backgroundColor="#1677FF"
            border="none"
            onClick={onCloseStudentModal}
          >
            Сохранить изменения
          </MyButton>
          <MyButton
            type="button"
            color="#1677FF"
            backgroundColor="#FFFFFF"
            border="solid 1px #4096FF"
            onClick={onCloseStudentModal}
          >
            Удалить ученика
          </MyButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};
