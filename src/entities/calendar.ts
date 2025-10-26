export interface ScheduleDay {
  id: string;
  name: string;
  start: string;
  end: string;
}

export interface Lesson {
  id: number;
  userId: number;
  dateStart: string;
  dateEnd: string;
  isRegular: boolean;
  desription: string;
}
