import type { ScheduleDay } from "@/entities";
import { instance } from "./instance";

export const calendarApi = {
  getAll: () => instance.get<ScheduleDay[]>("/calendar"),
};
