import styles from "./Students.module.css";
import { MyButton } from "@/components/UI/MyButton";
import empty from "@assets/images/empty.svg";
import { useCalendarContext } from "@/components/context/CalendarContext";
import { memo, useCallback, useMemo, useState } from "react";
import { StudentModal } from "../StudentModal";
import { SearchInput } from "@/components/UI/SearchInput";
import { Divider, Flex, Tabs } from "antd";
import { STUDENTS } from "./constants";
import { useAppContext } from "@/components/context/AppContext";
import { Tag } from "antd";

const presets = [
  "magenta",
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple",
];

export const Students = memo(() => {
  const [tab, setTab] = useState("1");
  const { onOpenStudentModal } = useCalendarContext();
  const { students, addNewStudent } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");
  const variants = ["solid"] as const;

  const simplifiedStudentData = useMemo(() => {
    return (
      students?.map((item) => ({
        name: item.name,
        lessonsCount: item.lessonsBalance || 0,
        tag: item.tag || "",
      })) || []
    );
  }, [students]);

  // making sure there is no filter without the entered value
  const clearSearchQuery = searchQuery.trim().toLowerCase();

  const filteredStudents = useMemo(() => {
    return simplifiedStudentData.filter((item) =>
      item.name.toLowerCase().includes(clearSearchQuery.toLowerCase())
    );
  }, [simplifiedStudentData, clearSearchQuery]);

  console.log("Students");

  const onChangeTab = useCallback(
    (value: string) => {
      setTab(value);
    },
    [tab]
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <section>
        <header className={styles.studentsHeader}>
          <SearchInput value={searchQuery} onChange={handleSearchChange} />
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
                    <div key={item.name} className={styles.studentsItems}>
                      <p className={styles.studentsItem}>{item.name}</p>
                      {item.tag && (
                        <div>
                          <Flex gap="small" align="center" wrap>
                            <Tag
                              color={
                                presets[
                                  Math.abs(
                                    item.tag.split("").reduce((a, b) => {
                                      a = (a << 5) - a + b.charCodeAt(0);
                                      return a & a;
                                    }, 0)
                                  ) % presets.length
                                ]
                              }
                            >
                              {item.tag}
                            </Tag>
                          </Flex>
                        </div>
                      )}
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
