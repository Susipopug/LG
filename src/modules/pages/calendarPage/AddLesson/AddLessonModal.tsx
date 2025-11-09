import { useCalendar } from "@/components/context/CalendarContext";
import { MyButton } from "@/components/UI/Button";
import type { Lesson } from "@/entities";
import {
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import type { PickerValue } from "@mui/x-date-pickers/internals";
import { useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import styles from "./AddLessonModal.module.css";

interface LessonForm
  extends Pick<Lesson, "userId" | "isRegular" | "desription"> {
  date: string;
  startTime: string;
  endTime: string;
}
export const AddLesson = () => {
  const { addLesson, onCloseCaledarModal, students } = useCalendar();

  const { register } = useForm<LessonForm>({
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

  return (
    <div className="dialog">
      <Dialog open={addLesson} onClose={onCloseCaledarModal}>
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
            type="submit"
            color="#FFFFFF"
            backgroundColor="#1677FF"
            border="none"
            onClick={onCloseCaledarModal}
          >
            Сохранить изменения
          </MyButton>
          <MyButton
            type="button"
            color="#1677FF"
            backgroundColor="#FFFFFF"
            border="solid 1px #4096FF"
            onClick={onCloseCaledarModal}
          >
            Отмена
          </MyButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};
