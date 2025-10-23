import type { ScheduleDayRequest } from "@/api/calendarApi";
import type { ScheduleDay } from "@/entities";
import type { Student } from "@/entities/student";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/calendar", () => {
    const calendarData = localStorage.getItem("calendar");
    return HttpResponse.json<ScheduleDay[]>(JSON.parse(calendarData ?? "[]"));
  }),

  http.post<never, ScheduleDayRequest>("/calendar", async ({ request }) => {
    const data = await request.json();
    const newItem = {
      id: Date.now().toString(),
      ...data,
    };

    const calendarData = localStorage.getItem("calendar");
    const parsedCalendarData = calendarData ? JSON.parse(calendarData) : [];

    localStorage.setItem(
      "calendar",
      JSON.stringify(parsedCalendarData.concat(newItem))
    );

    return HttpResponse.json<ScheduleDay>(newItem);
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
