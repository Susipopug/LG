import styles from "./CalendarModal.module.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { Student } from "@/entities/student";

interface CalendarModalProp {
  isDialogOpen: boolean;
  onClose: () => void;
  onAdd: (e: React.FormEvent) => void;
  currentStudent: string;
  setCurrentStudent: (id: string) => void;
  students: Student[];
}

export const CalendarModal = ({
  isDialogOpen,
  onClose,
  onAdd,
  currentStudent,
  setCurrentStudent,
  students,
}: CalendarModalProp) => {
  // const [open, setOpen] = React.useState(false);

  return (
    <>
      <Dialog
        open={isDialogOpen}
        onClose={onClose}
        className={styles.newEventmodalContainer}
        // onCancel={handleCancel}
      >
        <DialogTitle>Выберите студента</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel>Студент</InputLabel>
            <Select
              value={currentStudent}
              label="Студент"
              onChange={(e) => setCurrentStudent(e.target.value)}
            >
              {Array.isArray(students)
                ? students?.map((student) => (
                    <MenuItem key={student.id} value={student.id}>
                      {student.firstName}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Отмена</Button>
          <Button onClick={onAdd} variant="contained" color="primary">
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
