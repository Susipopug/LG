import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { ScheduleDay } from "@/entities/calendar";
import type { CalendarEvent } from "@/modules/pages/calendar/Calendar";
import { studentApi } from "@/api/studentApi";
import { calendarApi } from "@/api/calendarApi";
import type { Student } from "@/entities/student";

interface CalendarContextType {
  currentEvents: CalendarEvent[];
  setCurrentEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
  fetchCalendar: () => Promise<void>;
  fetchStudents: () => Promise<void>;
  isLoading: boolean;
}

const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined
);

interface CalendarProviderProps {
  children: ReactNode;
}

export const CalendarProvider: React.FC<CalendarProviderProps> = ({
  children,
}) => {
  const [currentEvents, setCurrentEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [currentStudent, setCurrentStudent] = useState<Student["id"]>("");

  const fetchStudents = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await studentApi.getAll();
      console.log("students data", data);
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchCalendar = useCallback(async () => {
    const { data } = await calendarApi.getAll();
    console.log(data);
    setCurrentEvents(
      data.map((item) => ({
        id: item.id,
        start: new Date(item.start),
        end: new Date(item.end),
        title: item.name,
        allDay: false,
        extendedProps: {
          completed: false,
          isHidden: false,
        },
      }))
    );
  }, []);

  useEffect(() => {
    fetchCalendar();
    fetchStudents();
  }, [fetchCalendar]);

  const value = {
    currentEvents,
    setCurrentEvents,
    fetchCalendar,
    fetchStudents,
    isLoading,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
};
