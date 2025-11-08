import styles from "./Students.module.css";
import { SearchInput } from "@/components/UI/SearchInput/SearchInput";
import BasicTabs from "@/components/UI/Tab/BasicTabs";
import { MyButton } from "@/components/UI/Button";
import empty from "@assets/images/empty.svg";

export const Students = () => {
  return (
    <>
      <div className={styles.studentsHeader}>
        <SearchInput />
        <BasicTabs />
        <MyButton
          type="button"
          color="#FFFFFF"
          backgroundColor="#1677FF"
          border="none"
        >
          Добавить ученика
        </MyButton>
      </div>
      <div className={styles.students}>
        <img src={empty} alt="empty" />
        <h3>Нет учеников</h3>
        <p>Добавьте ученика и назначьте ему занятия</p>
      </div>
    </>
  );
};
