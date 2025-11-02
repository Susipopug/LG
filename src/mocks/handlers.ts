import type { LessonRequest } from "@/api/calendarApi";
import type { Lesson } from "@/entities";
import type { Student } from "@/entities/student";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/calendar", () => {
    const calendarData = localStorage.getItem("calendar");
    return HttpResponse.json<Lesson[]>(JSON.parse(calendarData ?? "[]"));
  }),

  http.post<never, LessonRequest>("/calendar", async ({ request }) => {
    const data = await request.json();
    const newItem = {
      id: Date.now(),
      ...data,
    };

    const calendarData = localStorage.getItem("calendar");
    const parsedCalendarData = calendarData ? JSON.parse(calendarData) : [];

    localStorage.setItem(
      "calendar",
      JSON.stringify(parsedCalendarData.concat(newItem))
    );

    return HttpResponse.json<Lesson>(newItem);
  }),

  http.get("/student", () =>
    HttpResponse.json<Student[]>([
      {
        id: "1",
        firstName: "Иван",
        lastName: "Иванов",
      },
    ])
  ),
];
