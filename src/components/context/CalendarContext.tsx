import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { CalendarEvent } from "@/modules/pages/calendarPage/CalendarOld/Calendar";
import { studentApi } from "@/api/studentApi";
import { calendarApi } from "@/api/calendarApi";
import type { Student } from "@/entities/student";

interface CalendarContextType {
  students: Student[];
  isLoading: boolean;
  addLesson: boolean;
  currentEvents: CalendarEvent[];
  currentStudent: string;
  setCurrentStudent: React.Dispatch<React.SetStateAction<string>>;
  setCurrentEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
  fetchCalendar: () => Promise<void>;
  fetchStudents: () => Promise<void>;
  onAddLesson: () => void;
  onCloseModal: () => void;
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
  const [addLesson, setAddLesson] = useState(false);

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

  const onAddLesson = () => {
    setAddLesson(true);
  };
  const onCloseModal = () => {
    setAddLesson(false);
  };

  const value = {
    currentEvents,
    isLoading,
    addLesson,
    currentStudent,
    students,
    setCurrentStudent,
    onAddLesson,
    setCurrentEvents,
    fetchCalendar,
    fetchStudents,
    onCloseModal,
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
