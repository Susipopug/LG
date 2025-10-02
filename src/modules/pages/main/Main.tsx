import { Schedule } from "@/modules/Schedule/DaySchedule/Schedule";
import Sidebar from "@/modules/Schedule/Sidebar/Sidebar";
import styles from "./Main.module.css";
import { ProfilePanel } from "@/modules/Schedule/ProfilePanel/ProfilePanel";

const Main = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <Sidebar />
        <Schedule />
        <ProfilePanel />
      </div>
    </>
  );
};

export default Main;
