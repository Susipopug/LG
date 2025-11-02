import type { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { Dayjs } from "dayjs";

export interface Lesson {
  //id isn't sent 
  id: number; 
  //userID is sent to backend
  //solo lessons only
  userId: number; 
  dateStart: string;
  dateEnd: string;
  isRegular: boolean;
  desription: string;
}
