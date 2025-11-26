import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
  useRef,
} from "react";
import { studentApi } from "@/api/studentApi";
import { calendarApi } from "@/api/calendarApi";
import type { Student } from "@/entities/student";
import type {
  CalendarApi,
  DateSelectArg,
  EventInput,
} from "@fullcalendar/core/index.js";
import type { LessonForm } from "@/modules/pages/CalendarPage/AddLessonModal/AddLessonModal";
import dayjs from "dayjs";
import type { Lesson } from "@/entities";
import type FullCalendar from "@fullcalendar/react";

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
  addStudent: boolean;
  currentEvents: EventInput[];
  currentStudent: string;
  calendarModal: boolean;
  updatedScheduleItems: SheduleItem[];
  StatusMap: Record<TSheduleStatus, string>;
  calendarRef?: React.RefObject<FullCalendar>;
  setCurrentStudent: React.Dispatch<React.SetStateAction<string>>;
  setCurrentEvents: React.Dispatch<React.SetStateAction<EventInput[]>>;
  // fetchCalendar: () => Promise<void>;
  // fetchStudents: () => Promise<void>;
  handleAddEvent: (form: LessonForm) => void;
  onOpenCalendarModal: () => void;
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

// const getNewLessonData = () => {
//   const newLessonsData = localStorage.getItem("newLessonsData");
//   if (newLessonsData) {
//     return JSON.parse(newLessonsData);
//   }
//   return [];
// };

export const CalendarProvider: React.FC<CalendarProviderProps> = ({
  children,
}) => {
  const [currentEvents, setCurrentEvents] = useState<EventInput[]>(() => {
    // Load from localStorage on initial state
    const savedEvents = localStorage.getItem("newLessonsData");
    return savedEvents ? JSON.parse(savedEvents) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [currentStudent, setCurrentStudent] = useState<Student["id"]>("");
  const [calendarModal, setCalendarModal] = useState(false);

  const [addStudent, setAddStudent] = useState(false);
  const calendarRef = useRef<FullCalendar | null>(null);

  // const fetchStudents = useCallback(async () => {
  //   setIsLoading(true);
  //   try {
  //     const { data } = await studentApi.getAll();
  //     setStudents(data);
  //   } catch (error) {
  //     console.error("Error fetching students:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, []);

  // const fetchCalendar = useCallback(async () => {
  //   const { data } = await calendarApi.getAll();
  //   setCurrentEvents(
  //     data.map((item) => ({
  //       id: item.id,
  //       start: new Date(item.start),
  //       end: new Date(item.end),
  //       title: item.name,
  //       allDay: false,
  //       extendedProps: {
  //         completed: false,
  //         isHidden: false,
  //       },
  //     }))
  //   );
  // }, []);

  // useEffect(() => {
  //   fetchCalendar();
  //   fetchStudents();
  // }, [fetchCalendar]);

  // const addEvent = (eventData: any) => {
  //   const calendarApi: CalendarApi | undefined = calendarRef.current?.getApi();
  //   if (calendarApi) {
  //     calendarApi.addEvent(eventData);
  //   }
  // };

  const handleAddEvent = (form: LessonForm) => {
    const calendarLibraryApi = calendarRef.current?.getApi();

    const datePart = dayjs(form.date).startOf("day");

    // Add startTime and endTime (assuming they are durations or timestamps)
    const start = datePart
      .add(form.startTime.hour(), "hour")
      .add(form.startTime.minute(), "minute");

    const end = datePart
      .add(form.endTime.hour(), "hour")
      .add(form.endTime.minute(), "minute");

    // Convert Dayjs to Date for calendar event
    const calendarEvent: EventInput = {
      id: Date.now().toString(),
      start: start.toDate(),
      end: end.toDate(),
      title: form.userName,
      allDay: false,
      extendedProps: {
        description: form.description,
        isRegular: form.isRegular,
      },
    };
    console.log(calendarEvent);

    setCurrentEvents((prevEvents) => {
      const newLessonsData = [...prevEvents, calendarEvent];
      localStorage.setItem("newLessonsData", JSON.stringify(newLessonsData));
      return newLessonsData;
    });
    // Также добавляем в календарь
    if (calendarLibraryApi) {
      calendarLibraryApi.addEvent(calendarEvent);
    }
  };

  const onOpenCalendarModal = () => {
    setCalendarModal(true);
  };
  const onOpenStudentModal = () => {
    setAddStudent(true);
  };
  const onCloseCaledarModal = () => {
    setCalendarModal(false);
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
    calendarModal,
    currentStudent,
    students,
    addStudent,
    updatedScheduleItems,
    StatusMap,
    scheduleItems,
    calendarRef,
    setCurrentStudent,
    handleAddEvent,
    onOpenCalendarModal,
    setCurrentEvents,
    // fetchCalendar,
    // fetchStudents,
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

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error(
      "useCalendarContext must be used within a CalendarProvider"
    );
  }
  return context;
};
