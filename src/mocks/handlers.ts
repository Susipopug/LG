import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/calendar", () =>
    HttpResponse.json([
      {
        id: "1",
        name: "Дмитрий",
        start: "2025-10-25T10:00:00Z",
        end: "2025-10-25T11:00:00Z",
      },
    ])
  ),
];
