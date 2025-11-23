export interface Lesson {
  //id isn't sent
  id: number;
  //userID is sent to backend
  //solo lessons only
  userId: number;
  userName: string;
  dateStart: string;
  dateEnd: string;
  isRegular: boolean;
  frequency: string;
  every: number;
  description: string;
}
