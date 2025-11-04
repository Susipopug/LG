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
import type { PickerValue } from "@mui/x-date-pickers/internals";
import { useState, type ChangeEvent } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./AddLessonModal.module.css";

interface LessonForm
  extends Pick<Lesson, "userId" | "isRegular" | "desription"> {
  date: string;
  startTime: string;
  endTime: string;
}
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
    control,
    formState: { errors },
  } = useForm<LessonForm>({
    mode: "onSubmit",
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<PickerValue | undefined>(undefined);
  const [startTime, setStartTime] = useState<PickerValue | undefined>(
    undefined
  );
  const [endTime, setEndTime] = useState<PickerValue | undefined>(undefined);
  const [isRegular, setIsRegular] = useState(false);

  // Added character limit to the textarea
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

  // const onSubmit = () => {
  //   if (!date || !currentStudent || !startTime || !endTime || !isRegular) {

  //     return;
  //   }

  //   const newEvent: Lesson = {
  //     id: `${date.toISOString()}-${currentStudent}`,
  //     title: currentStudent,
  //     start: startTime,
  //     end: endTime,
  //     allDay: false,
  //     extendedProps: {
  //       desription: description,
  //       userId: currentStudent,
  //       isRegular,
  //     },
  //   };

  //   const calendarApi = selectedDate?.view?.calendar;
  //   if (calendarApi) {
  //     calendarApi.addEvent(newEvent);
  //   }

  //   addEventToState(newEvent);

  //   onCloseModal();
  // };

  return (
    <div className="dialog">
      <Dialog open={addLesson} onClose={onCloseModal}>
        <DialogContent>
          <form className="dialogForm">
            <InputLabel className="inputLabel">Ученик</InputLabel>
            <Select
              displayEmpty
              renderValue={(value: unknown) =>
                value ? value.toString() : "Выберите ученика"
              }
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
            <div className={styles.formDate}>
              {/* <Controller name="date" control={control} render={({field:{value, onChange}})=> <DatePicker value={value} sx={{ maxWidth: 140 }} onChange={()=>} />}/>
             
              <TimePicker
                {...register("startTime")}
                sx={{ maxWidth: 140 }}
                label="Начало"
              />
              <TimePicker
                {...register("endTime")}
                sx={{ maxWidth: 140 }}
                label="Окончание"
              /> */}
            </div>
            <FormControlLabel
              label="Сделать занятие регулярным"
              control={
                <Switch
                  checked={isRegular}
                  onChange={(e) => setIsRegular(e.target.checked)}
                />
              }
            />
            {isRegular && (
              <>
                <InputLabel className="inputLabel">
                  Регулярность занятий
                </InputLabel>
                <Select fullWidth>
                  <MenuItem></MenuItem>
                </Select>
              </>
            )}

            <InputLabel className="inputLabel">
              Комментарий к занятию
            </InputLabel>
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
