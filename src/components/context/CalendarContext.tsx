import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { studentApi } from "@/api/studentApi";
import { calendarApi } from "@/api/calendarApi";
import type { Student } from "@/entities/student";

const ScheduleStatus = {
  Cancelled: "CANCELLED",
  Skipped: "SKIPPED",
  Conducted: "CONDUCTED",
  Awaiting: "AWAITING",
} as const;

export type TSheduleStatus =
  (typeof ScheduleStatus)[keyof typeof ScheduleStatus];

export interface SheduleItem {
  time: string;
  studentInitials: string;
  studentName: string;
  status: TSheduleStatus;
}
interface CalendarContextType {
  students: Student[];
  isLoading: boolean;
  addLesson: boolean;
  currentEvents: CalendarEvent[];
  currentStudent: string;
  addStudent: boolean;
  updatedScheduleItems: SheduleItem[];
  StatusMap: Record<TSheduleStatus, string>;
  setCurrentStudent: React.Dispatch<React.SetStateAction<string>>;
  setCurrentEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
  fetchCalendar: () => Promise<void>;
  fetchStudents: () => Promise<void>;
  onAddLesson: () => void;
  onCloseCaledarModal: () => void;
  onCloseStudentModal: () => void;
  onOpenStudentModal: () => void;
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
  const [addStudent, setAddStudent] = useState(false);

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
  const onOpenStudentModal = () => {
    setAddStudent(true);
  };
  const onCloseCaledarModal = () => {
    setAddLesson(false);
  };
  const onCloseStudentModal = () => {
    setAddStudent(false);
  };

  const scheduleItems: SheduleItem[] = [
    {
      time: "8:00 - 9:00",
      studentInitials: "Д",
      studentName: "Джон Траволта",
      status: ScheduleStatus.Awaiting,
    },
    {
      time: "9:00 - 10:00",
      studentInitials: "Б",
      studentName: "Брюс Уиллис",
      status: ScheduleStatus.Awaiting,
    },
    {
      time: "14:00 - 15:00",
      studentInitials: "М",
      studentName: "Майк Тайсон",
      status: ScheduleStatus.Awaiting,
    },
    {
      time: "14:00 - 15:00",
      studentInitials: "П",
      studentName: "Перис Хилтон",
      status: ScheduleStatus.Awaiting,
    },
  ];

  const updatedScheduleItems: SheduleItem[] = scheduleItems.map((item) => ({
    ...item,
    studentInitials: item.studentName.charAt(0),
  }));

  const StatusMap: Record<TSheduleStatus, string> = {
    [ScheduleStatus.Cancelled]: "Отменено",
    [ScheduleStatus.Skipped]: "Пропущено",
    [ScheduleStatus.Conducted]: "Проведено",
    [ScheduleStatus.Awaiting]: "Ожидается",
  };

  const value = {
    currentEvents,
    isLoading,
    addLesson,
    currentStudent,
    students,
    addStudent,
    updatedScheduleItems,
    StatusMap,
    scheduleItems,
    setCurrentStudent,
    onAddLesson,
    setCurrentEvents,
    fetchCalendar,
    fetchStudents,
    onCloseCaledarModal,
    onCloseStudentModal,
    onOpenStudentModal,
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
