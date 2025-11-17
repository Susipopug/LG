import styles from "./Students.module.css";
import { DynamicTabs } from "@/components/UI/Tab/BasicTabs";
import { MyButton } from "@/components/UI/MyButton";
import empty from "@assets/images/empty.svg";
import { useCalendar } from "@/components/context/CalendarContext";
import { useState } from "react";
import type { IStudent } from "../interfaces/StudentInterface";
import { StudentModal } from "../StudentModal";
import { SearchInput } from "@/components/UI/SearchInput";

export const Students = () => {
  const { onOpenStudentModal } = useCalendar();
  const [student, setStudent] = useState<IStudent[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const addNewStudent = (student: IStudent) => {
    setStudent((prev) => [...prev, student]);
  };

  const lessonsCountMap: Record<string, string> = {
    "Джон Траволта": "5 занятий",
    "Брюс Уиллис": "3 занятия",
    "Майк Тайсон": "4 занятий",
    "Перис Хилтон": "2 занятия",
  };

  const simplifiedStudentData = student?.map((item) => ({
    name: item.name,
    lessonsCount: lessonsCountMap[item.phoneNumber] || 0,
  }));

  const filteredStudents = simplifiedStudentData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <section>
        <header className={styles.studentsHeader}>
          <SearchInput
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          <DynamicTabs configKey="students" />
          <div className={styles.studentsButton}>
            <MyButton
              onClick={onOpenStudentModal}
              buttonType="primary"
              size="large"
            >
              Добавить ученика
            </MyButton>
          </div>
        </header>
        <main>
          <h2 className={styles.visuallyHidden}>Ученики</h2>
          {filteredStudents.length > 0 ? (
            <div className={styles.studentsMain}>
              {filteredStudents.map((item) => (
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

          <StudentModal onAddNewStudent={addNewStudent} />
        </main>
      </section>
    </>
  );
};
