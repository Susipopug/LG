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

export const Calendar = () => {
  // const [currentEvents, setCurrentEvents] = useState<EventInput[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [calendarDateSelected, setCalendarDateSelected] =
    useState<DateSelectArg | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [currentStudent, setCurrentStudent] = useState<Student["id"]>("");
  const [isCreateLessonLoading, setIsCreateLessonLoading] = useState(false);

  const { onOpenCalendarModal, currentEvents, calendarRef } = useCalendarContext();

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

  // useEffect(() => {
  //   fetchCalendar();
  //   fetchStudents();
  // }, [fetchCalendar]);

  // const handleDateClick = (selected: DateSelectArg) => {
  //   console.log("Date selected:", selected);
  //   setCalendarDateSelected(selected);
  //   onOpenCalendarModal();

  //   // Extract time information
  //   const startTime = selected.start.toLocaleTimeString([], {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   });
  //   const endTime = selected.end.toLocaleTimeString([], {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   });

  //   console.log(`Selected time: ${startTime} - ${endTime}`);
  // };

  // const handleCloseDialog = () => {
  //   setIsDialogOpen(false);
  // };

  // const handleAddEvent = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (currentStudent && selectedDate) {
  //     const calendarLibraryApi = selectedDate.view.calendar;
  //     calendarLibraryApi.unselect();

  //     const newEvent: EventInput = {
  //       id: `${selectedDate.start.toISOString()}-${currentStudent}`,
  //       title: currentStudent,
  //       start: selectedDate?.start,
  //       end: selectedDate?.end || selectedDate.start,
  //       allDay: selectedDate?.allDay,
  //       extendedProps: {
  //         completed: false,
  //       },
  //     };

  //     setCurrentEvents((prevEvents) => [...prevEvents, newEvent]);

  //     // Также добавляем в календарь
  //     calendarLibraryApi.addEvent(newEvent);
  //     handleCloseDialog();
  //   }
  // };

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
            ref={calendarRef}
            locale={ruLocale}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            // select={handleDateClick}
            events={currentEvents}
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
      </section>
    </>
  );
};
