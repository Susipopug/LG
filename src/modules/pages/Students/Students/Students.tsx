import styles from "./Students.module.css";
import { SearchInput } from "@/components/UI/SearchInput/SearchInput";
import BasicTabs from "@/components/UI/Tab/BasicTabs";
import { MyButton } from "@/components/UI/Button";
import empty from "@assets/images/empty.svg";
import { useCalendar } from "@/components/context/CalendarContext";
import { StudentModal } from "../StudentModal/StudentModal";

export const Students = () => {
  const lessonsCountMap: Record<string, string> = {
    "Джон Траволта": "5 занятий",
    "Брюс Уиллис": "3 занятия",
    "Майк Тайсон": "4 занятий",
    "Перис Хилтон": "2 занятия",
  };

  const { onAddStudent, updatedScheduleItems } = useCalendar();

  const simplifiedSchedule = updatedScheduleItems.map((item) => ({
    name: item.studentName,
    lessonsCount: lessonsCountMap[item.studentName] || 0,
  }));
  return (
    <>
      <section>
        <header className={styles.studentsHeader}>
          <SearchInput />
          <BasicTabs />
          <MyButton onClick={onAddStudent} buttonType="primary">
            Добавить ученика
          </MyButton>
        </header>
        <main>
          <h2 className={styles.visuallyHidden}>Ученики</h2>
          {simplifiedSchedule.length > 0 ? (
            <div className={styles.studentsMain}>
              {simplifiedSchedule.map((item) => (
                <div className={styles.studentsList}>
                  <p className={styles.studentsItem}>{item.name}</p>
                  <p className={styles.studentsItem}>{item.lessonsCount}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.students}>
              <img height={180} width={200} src={empty} alt="empty" />
              <h3>Нет учеников</h3>
              <p>Добавьте ученика и назначьте ему занятия</p>
            </div>
          )}

          <StudentModal />
        </main>
      </section>
    </>
  );
};
