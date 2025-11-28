import { useCallback, useEffect, useState } from "react";
import { type DateSelectArg, type EventInput } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./Calendar.module.css";
import { calendarApi } from "@/api/calendarApi";
import { studentApi } from "@/api/studentApi";
import type { Student } from "@/entities/student";
import ruLocale from "@fullcalendar/core/locales/ru";
import { useCalendarContext } from "@/components/context/CalendarContext";
import { CalendarModal } from "@/modules/pages/CalendarPage/CalendarModal";
import { AddLessonModal } from "../AddLessonModal";
import dayjs from "dayjs";
import { EditLessonModal } from "../EditLessonModal";

export const Calendar = () => {
  // const [currentEvents, setCurrentEvents] = useState<EventInput[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [calendarDateSelected, setCalendarDateSelected] =
    useState<DateSelectArg | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [currentStudent, setCurrentStudent] = useState<Student["id"]>("");
  const [isCreateLessonLoading, setIsCreateLessonLoading] = useState(false);

  const { onOpenCalendarModal, currentEvents, onOpenEditModal } =
    useCalendarContext();

  const setStatusColor = () => {
    return currentEvents.map((event) => {
      const isAfter = dayjs(new Date()).isAfter(
        dayjs(event.end as string),
        "day"
      );
      const isBefore = dayjs(new Date()).isBefore(
        dayjs(event.end as string),
        "day"
      );

      return {
        ...event,
        textColor: "#000000",
        backgroundColor: isAfter || isBefore ? "#F0F0F0" : "#FFFFFF",
      };
    });
  };

  // const fetchCalendar = useCallback(async () => {
  //   const { data } = await calendarApi.getAll();
  //   console.log(data);
  //   setCurrentEvents(
  //     data.map((item) => ({
  //       id: item.id.toString(),
  //       start: item.dateStart,
  //       end: item.dateEnd,
  //       title: item.description,
  //       allDay: false,
  //       extendedProps: {
  //         completed: false,
  //         isHidden: false,
  //       },
  //     }))
  //   );
  // }, []);

  // const fetchStudents = useCallback(async () => {
  //   const { data } = await studentApi.getAll();
  //   console.log("students data", data);
  //   setStudents(data);
  // }, []);

  return (
    <>
      <section className={styles.calendarContainer} data-theme={"light"}>
        <h2 className={styles.visuallyHidden}>Календарь</h2>
        <div className={styles.calendarRight}>
          <FullCalendar
            height={"70vh"}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev next",
              center: "title",
              right: "createLessonButton",
            }}
            titleFormat={{ month: "long", year: "numeric" }}
            slotLabelFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
              meridiem: false,
            }}
            dayHeaderFormat={{
              day: "numeric",
              month: "numeric",
              weekday: "long",
            }}
            // порядок дня недели и даты не меняется
            customButtons={{
              createLessonButton: {
                text: "Создать занятие",
                click: () => {
                  onOpenCalendarModal();
                },
              },
            }}
            initialView="timeGridWeek"
            locale={ruLocale}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            // select={handleDateClick}
            events={setStatusColor()}
            eventClick={onOpenEditModal}
            allDaySlot={false}
            selectConstraint={{
              startTime: "00:00",
              endTime: "24:00",
            }}
          />
        </div>
        {/* <CalendarModal
          isDialogOpen={isDialogOpen}
          onClose={handleCloseDialog}
          onAdd={handleAddEvent}
          isLoading={isCreateLessonLoading}
          currentStudent={currentStudent}
          setCurrentStudent={setCurrentStudent}
          students={students}
        /> */}

        <AddLessonModal />
        <EditLessonModal />
      </section>
    </>
  );
};
