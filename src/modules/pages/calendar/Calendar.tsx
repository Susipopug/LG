import { useEffect, useState } from "react";
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
import { Modal } from "antd";

interface CalendarEvent {
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
  const [newEventTitle, setNewEventTitle] = useState<string>("");
  const [eventToDelete, setEventToDelete] = useState<EventClickArg | null>(
    null
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("events", JSON.stringify(currentEvents));
    }
  }, [currentEvents]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedEvents = localStorage.getItem("events");

      if (savedEvents) {
        try {
          const parsedEvents = JSON.parse(savedEvents).map((evt: any) => ({
            ...evt,
            start: new Date(evt.start),
            end: new Date(evt.end),
          }));
          setCurrentEvents(parsedEvents);
        } catch (error) {
          console.error("Error parsing events from localStorage:", error);
        }
      }
    }
  }, []);

  const handleOk = () => {
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  const handleDateClick = (selected: DateSelectArg) => {
    console.log("Date selected:", selected);
    setSelectedDate(selected);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewEventTitle("");
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEventTitle && selectedDate) {
      const calendarApi = selectedDate.view.calendar;
      calendarApi.unselect();

      const newEvent: CalendarEvent = {
        id: `${selectedDate.start.toISOString()}-${newEventTitle}`,
        title: newEventTitle,
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
      calendarApi.addEvent(newEvent);
      handleCloseDialog();
    }
  };

  const handleEventClick = (selected: EventClickArg) => {
    setEventToDelete(selected);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteEvent = () => {
    if (eventToDelete) {
      setCurrentEvents((prev) =>
        prev.filter((evt) => evt.id !== eventToDelete.event.id)
      );
      eventToDelete.event.remove();
    }
    setIsDeleteDialogOpen(false);
    setEventToDelete(null);
  };

  const handleCancelEvent = () => {
    // Just close the delete confirmation modal without taking action
    setIsDeleteDialogOpen(false);
    setEventToDelete(null);
  };

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

  const [isDarkTheme, setIsDarkTheme] = useState(false); // состояние темы
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkTheme) {
      root.setAttribute("data-theme", "dark");
      document.body.style.backgroundColor = "#1e1e1e";
      document.body.style.color = "#fff";
    } else {
      root.removeAttribute("data-theme");
      document.body.style.backgroundColor = "#fff";
      document.body.style.color = "#000";
    }
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  //   const handleOk = () => {
  //   // Call your function to add the event
  //   handleAddEvent();

  //   // Optional: show some loading indicator
  //   setIsDialogOpen(false);
  // };

  const getEventClassNames = (arg: any) => {
    const classes = [];
    if (arg.event.extendedProps.completed) {
      classes.push("fc-event-completed");
    }
    return classes;
  };

  const renderEventContent = (eventInfo: any) => {
    return (
      <div
        className={
          eventInfo.event.extendedProps.completed ? "fc-event-completed" : ""
        }
      >
        <i>{eventInfo.event.title}</i>
      </div>
    );
  };

  return (
    <>
      <div
        className={styles.calendarContainer}
        data-theme={isDarkTheme ? "dark" : "light"}
      >
        <div className={styles.calendarLeft}>
          <button
            onClick={toggleTheme}
            className={styles.themeButton}
            aria-label="Toggle dark mode"
          >
            {/* {isDarkTheme ? (
              <span className="text-xl">☀️</span>
            ) : (
              <span className="text-xl">🌙</span>
            )} */}
          </button>

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
                  {formatDate(event.start, {
                    year: "2-digit",
                    month: "short",
                    day: "numeric",
                  })}
                </label>
                <button>+</button>
              </li>
            ))}
          </ul>
        </div>
        <div
          className={styles.calendarRight}
          // data-theme={isDarkTheme ? "dark" : "light"}
        >
          <FullCalendar
            height={"100vh"}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev next today",
              center: "title",
              right: "dayGridMonth timeGridWeek timeGridDay",
            }}
            initialView="timeGridWeek"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            events={currentEvents}
            eventClassNames={getEventClassNames}
            eventContent={renderEventContent}
            // themeSystem={isDarkTheme ? "bootstrap-dark" : "standard"}
          />
        </div>
      </div>
      <Modal
        className={styles.newEventmodalContainer}
        title={<div className={styles.newEventmodalTitle}>Add a student</div>}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isDialogOpen}
        onOk={handleAddEvent}
        onCancel={handleCancel}
      >
        <form className={styles.newEventDialogForm}>
          <input
            type="text"
            className={styles.inputField}
            placeholder="Enter student name"
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
          />
        </form>
      </Modal>
    </>
  );
};
