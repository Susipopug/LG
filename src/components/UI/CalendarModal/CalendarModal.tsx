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
import { MyButton } from "../Button";

interface CalendarModalProp {
  isDialogOpen: boolean;
  onClose: () => void;
  onAdd: (e: React.FormEvent) => void;
  currentStudent: string;
  setCurrentStudent: (id: string) => void;
  students: Student[];
  isLoading: boolean;
}

export const CalendarModal = ({
  isDialogOpen,
  currentStudent,
  students,
  isLoading,
  onClose,
  onAdd,
  setCurrentStudent,
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
                    <MenuItem key={student.id} value={student.firstName}>
                      {student.firstName}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            loading={isLoading}
            variant="contained"
            color="primary"
            onClick={onAdd}
          >
            Добавить
          </Button>
          <MyButton
            border="1px solid #1677FF"
            backgroundColor="#FFFFFF"
            color="#1677FF"
          >
            Отмена
          </MyButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
