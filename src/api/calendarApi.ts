import type { Lesson } from "@/entities";
import { instance } from "./instance";

export interface LessonRequest extends Omit<Lesson, "id"> {}

export const calendarApi = {
  getAll: () => instance.get<Lesson[]>("/calendar"),
  createLesson: (data: LessonRequest) =>
    instance.post<Lesson>("/calendar", data),
};
