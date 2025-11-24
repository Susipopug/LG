import styles from "./Students.module.css";
import { MyButton } from "@/components/UI/MyButton";
import empty from "@assets/images/empty.svg";
import { useCalendar } from "@/components/context/CalendarContext";
import { memo, useState } from "react";
import { StudentModal } from "../StudentModal";
import { SearchInput } from "@/components/UI/SearchInput";
import { Tabs } from "antd";
import { STUDENTS } from "./constants";
import { useAppContext } from "@/components/context/AppContext";

export const Students = memo(() => {
  const [tab, setTab] = useState("1");
  const { onOpenStudentModal } = useCalendar();
  const { students, addNewStudent } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");

  const simplifiedStudentData = students?.map((item) => ({
    name: item.name,
    lessonsCount: item.lessonsBalance || 0,
  }));

  // making sure there is no filter without the entered value
  const clearSearchQuery = searchQuery.trim().toLowerCase();

  const filteredStudents = simplifiedStudentData.filter((item) =>
    item.name.toLowerCase().includes(clearSearchQuery.toLowerCase())
  );
  console.log("Students");

  const onChangeTab = (value: string) => {
    setTab(value);
  };

  return (
    <>
      <section>
        <header className={styles.studentsHeader}>
          <SearchInput
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          <Tabs activeKey={tab} items={STUDENTS} onChange={onChangeTab} />
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

        <main className={styles.studentsMain}>
          <h2 className={styles.visuallyHidden}>Ученики</h2>
          {tab == "1" ? (
            <>
              {filteredStudents.length > 0 ? (
                <div className={styles.studentsList}>
                  {filteredStudents.map((item) => (
                    <div className={styles.studentsItems}>
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
            </>
          ) : (
            <div>Неактивные ученики</div>
          )}
        </main>
        <StudentModal onAddNewStudent={addNewStudent} />
      </section>
    </>
  );
});
