import { instance } from "./instance";
import type { Student } from "@/entities/student";

export const studentApi = {
  getAll: () => instance.get<Student[]>("/student"),
};
