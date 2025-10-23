import { useCalendar } from "@/components/context/CalendarContext";
import { MyButton } from "@/components/UI/Button";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";

export const AddLesson = () => {
  const {
    addLesson,
    onCloseModal,
    currentStudent,
    setCurrentStudent,
    students,
  } = useCalendar();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div>
      <Dialog open={addLesson} onClose={onCloseModal}>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel>Ученик</InputLabel>
            <Select
              value={currentStudent}
              label="Студент"
              onChange={(e) => setCurrentStudent(e.target.value)}
            >
              {Array.isArray(students)
                ? students?.map((student) => (
                    <MenuItem key={student.id} value={student.firstName}>
                      {student.firstName}
                    </MenuItem>
                  ))
                : null}
            </Select>
            <TextField
              autoFocus
              margin="dense"
              multiline
              label="Коментарии к занятию"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
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
          {/* <Button onClick={onCloseModal} color="primary">
            Отмена
          </Button>
          <Button onClick={onCloseModal} color="primary" variant="contained">
            ОК
          </Button> */}
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
