import { useCalendar } from "@/components/context/CalendarContext";
import { MyButton } from "@/components/UI/Button";
import type { Lesson } from "@/entities";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";

export const AddLesson = () => {
  const {
    addLesson,
    onCloseModal,
    currentStudent,
    setCurrentStudent,
    students,
  } = useCalendar();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Omit<Lesson, "id">>({
    mode: "onSubmit",
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
      <Dialog open={addLesson} onClose={onCloseModal}>
        <DialogContent>
          <form className="dialogForm">
            <InputLabel className="inputLabel">Ученик</InputLabel>
            <Select
              className="formSelect"
              sx={{ marginBottom: 2 }}
              fullWidth
              {...register("userId")}
            >
              {Array.isArray(students)
                ? students?.map((student) => (
                    <MenuItem key={student.id} value={student.firstName}>
                      {student.firstName}
                    </MenuItem>
                  ))
                : null}
            </Select>
            {/* <DatePicker {...register("")} label="Дата" /> */}
            <div
              className="formDate"
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <DatePicker sx={{ maxWidth: 140 }} />
              <TimePicker sx={{ maxWidth: 140 }} label="Начало" />
              <TimePicker sx={{ maxWidth: 140 }} label="Окончание" />
            </div>
            <FormControlLabel
              label="Сделать занятие регулярным"
              control={<Switch />}
            />
            <InputLabel>Регулярность занятий</InputLabel>
            <Select fullWidth>
              <MenuItem></MenuItem>
            </Select>

            <TextField
              autoFocus
              margin="dense"
              multiline
              label="Коментарий к занятию"
              fullWidth
              value={title}
              onChange={handleChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <MyButton
            color="#FFFFFF"
            backgroundColor="#1677FF"
            border="none"
            onClick={onCloseModal}
          >
            Сохранить изменения
          </MyButton>
          <MyButton
            color="#1677FF"
            backgroundColor="#FFFFFF"
            border="solid 1px #4096FF"
            onClick={onCloseModal}
          >
            Отмена
          </MyButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

// <Dialog
//   open={isDialogOpen}
//   onClose={onClose}
//   className={styles.newEventmodalContainer}
//   // onCancel={handleCancel}
// >
//   <DialogTitle>Выберите студента</DialogTitle>
//   <DialogContent>
//     <FormControl fullWidth>
//       <InputLabel>Студент</InputLabel>
//       <Select
//         value={currentStudent}
//         label="Студент"
//         onChange={(e) => setCurrentStudent(e.target.value)}
//       >
//         {Array.isArray(students)
//           ? students?.map((student) => (
//               <MenuItem key={student.id} value={student.firstName}>
//                 {student.firstName}
//               </MenuItem>
//             ))
//           : null}
//       </Select>
//     </FormControl>
//   </DialogContent>
//   <DialogActions>
//     <Button onClick={onClose}>Отмена</Button>
//     <Button
//       loading={isLoading}
//       variant="contained"
//       color="primary"
//       onClick={onAdd}
//     >
//       Добавить
//     </Button>
//   </DialogActions>
// </Dialog>;
