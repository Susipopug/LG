export interface Lesson {
  //id isn't sent
  id: number;
  //userID is sent to backend
  userId: number;
  userName: string;
  dateStart: string;
  dateEnd: string;
  isRegular: boolean;
  frequency: string;
  description: string;
}
