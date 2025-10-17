import type { ScheduleDay } from "@/entities";
import { instance } from "./instance";

export interface ScheduleDayRequest extends Omit<ScheduleDay, "id"> {}

export const calendarApi = {
  getAll: () => instance.get<ScheduleDay[]>("/calendar"),
  createLesson: (data: ScheduleDayRequest) =>
    instance.post<ScheduleDay>("/calendar", data),
};
