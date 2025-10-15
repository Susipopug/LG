import { useCallback, useEffect, useState } from "react";
import {
  formatDate,
  type DateSelectArg,
  type EventClickArg,
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./Calendar.module.css";
import { calendarApi } from "@/api/calendarApi";
import { studentApi } from "@/api/studentApi";
import type { Student } from "@/entities/student";
import { Dialog } from "@mui/material";
import { CalendarModal } from "@/components/UI/CalendarModal/CalendarModal";
import ruLocale from "@fullcalendar/core/locales/ru";

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  extendedProps: {
    completed?: boolean;
    isHidden?: boolean;
  };
}

export const Calendar = () => {
  const [currentEvents, setCurrentEvents] = useState<CalendarEvent[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);
  const [eventToDelete, setEventToDelete] = useState<EventClickArg | null>(
    null
  );
  // const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [currentStudent, setCurrentStudent] = useState<Student["id"]>("");

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     localStorage.setItem("events", JSON.stringify(currentEvents));
  //   }
  // }, [currentEvents]);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const savedEvents = localStorage.getItem("events");

  //     if (savedEvents) {
  //       try {
  //         const parsedEvents = JSON.parse(savedEvents).map((evt: any) => ({
  //           ...evt,
  //           start: new Date(evt.start),
  //           end: new Date(evt.end),
  //         }));
  //         setCurrentEvents(parsedEvents);
  //       } catch (error) {
  //         console.error("Error parsing events from localStorage:", error);
  //       }
  //     }
  //   }
  // }, []);

  //Получение данных всех записей

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

  const fetchStudents = useCallback(async () => {
    const { data } = await studentApi.getAll();
    console.log("students data", data);
    setStudents(data);
  }, []);

  useEffect(() => {
    fetchCalendar();
    fetchStudents();
  }, [fetchCalendar]);

  const handleDateClick = (selected: DateSelectArg) => {
    console.log("Date selected:", selected);
    setSelectedDate(selected);
    setIsDialogOpen(true);

    // Extract time information
    const startTime = selected.start.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const endTime = selected.end.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    console.log(`Selected time: ${startTime} - ${endTime}`);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStudent && selectedDate) {
      const calendarLibraryApi = selectedDate.view.calendar;
      calendarLibraryApi.unselect();

      const newEvent: CalendarEvent = {
        id: `${selectedDate.start.toISOString()}-${currentStudent}`,
        title: currentStudent,
        start: selectedDate?.start,
        end: selectedDate?.end || selectedDate.start,
        allDay: selectedDate?.allDay,
        extendedProps: {
          completed: false,
        },
      };

      // Добавляем событие в состояние
      setCurrentEvents((prevEvents) => [...prevEvents, newEvent]);

      // Также добавляем в календарь
      calendarLibraryApi.addEvent(newEvent);
      handleCloseDialog();
    }
  };

  // const handleEventClick = (selected: EventClickArg) => {
  //   setEventToDelete(selected);
  //   setIsDeleteDialogOpen(true);
  // };

  // const handleDeleteEvent = () => {
  //   if (eventToDelete) {
  //     setCurrentEvents((prev) =>
  //       prev.filter((evt) => evt.id !== eventToDelete.event.id)
  //     );
  //     eventToDelete.event.remove();
  //   }
  //   setIsDeleteDialogOpen(false);
  //   setEventToDelete(null);
  // };

  // const handleCancelEvent = () => {
  //   // Just close the delete confirmation modal without taking action
  //   setIsDeleteDialogOpen(false);
  //   setEventToDelete(null);
  // };

  const toggleComplete = (eventId: string) => {
    setCurrentEvents((prevEvents) =>
      prevEvents.map((evt) =>
        evt.id === eventId
          ? {
              ...evt,
              extendedProps: {
                ...evt.extendedProps,
                completed: !evt.extendedProps.completed,
                isHidden: true,
              },
            }
          : evt
      )
    );
  };

  // const getEventClassNames = (arg: any) => {
  //   const classes = [];
  //   if (arg.event.extendedProps.completed) {
  //     classes.push("fc-event-completed");
  //   }
  //   return classes;
  // };

  // const renderEventContent = (eventInfo: any) => {
  //   return (
  //     <div
  //       className={
  //         eventInfo.event.extendedProps.completed ? "fc-event-completed" : ""
  //       }
  //     >
  //       <i>{eventInfo.event.title}</i>
  //     </div>
  //   );
  // };

  return (
    <>
      <div className={styles.calendarContainer} data-theme={"light"}>
        {/* <div className={styles.calendarLeft}>
          <div className={styles.calendarLeftTitle}>Calendar Events</div>
          <ul className={styles.calendarEvents}>
            {currentEvents.length <= 0 && (
              <div className={styles.calendarEventsText}>No event Present</div>
            )}
            {currentEvents.map((event) => (
              <li
                className={
                  event.extendedProps.completed
                    ? styles.calendarEventsHidden
                    : styles.calendarEventsList
                }
                key={event.id}
                onClick={() => toggleComplete(event.id)}
              >
                <div
                  className={
                    event.extendedProps.completed
                      ? styles.calendarEventsCompleted
                      : ""
                  }
                >
                  {event.title}
                </div>

                <br />
                <label className={styles.calendarEventsLabel}>
                  {selectedDate && (
                    <p>
                      {selectedDate.start.toLocaleTimeString("ru-RU", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      -
                      {selectedDate.end.toLocaleTimeString("ru-RU", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  )}
                 
                </label>
                <button>+</button>
              </li>
            ))}
          </ul>
        </div> */}
        <div
          className={styles.calendarRight}
          // data-theme={isDarkTheme ? "dark" : "light"}
        >
          <FullCalendar
            height={"100vh"}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev next",
              center: "title",
              right: "",
            }}
            initialView="timeGridWeek"
            locale={ruLocale}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            events={currentEvents}
            // eventClick={handleEventClick}
            // eventClassNames={getEventClassNames}
            // eventContent={renderEventContent}
          />
        </div>
        <CalendarModal
          isDialogOpen={isDialogOpen}
          onClose={handleCloseDialog}
          onAdd={handleAddEvent}
          currentStudent={currentStudent}
          setCurrentStudent={setCurrentStudent}
          students={students}
        />
      </div>
    </>
  );
};
