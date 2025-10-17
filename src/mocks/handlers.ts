import type { ScheduleDayRequest } from "@/api/calendarApi";
import type { ScheduleDay } from "@/entities";
import type { Student } from "@/entities/student";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/calendar", () =>
    HttpResponse.json<ScheduleDay[]>([
      {
        id: "1",
        name: "Дмитрий",
        start: "2025-10-25T10:00:00Z",
        end: "2025-10-25T11:00:00Z",
      },
    ])
  ),

  http.post<never, ScheduleDayRequest>("/calendar", async ({ request }) => {
    const data = await request.json();

    return HttpResponse.json<ScheduleDay>({
      id: Date.now().toString(),
      ...data,
    });
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
