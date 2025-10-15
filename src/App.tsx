import { Header } from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import { ScheduleHeader } from "./modules/Schedule/ScheduleHeader/ScheduleHeader";
import Sidebar from "./modules/Schedule/Sidebar/Sidebar";
import styles from "./App.module.css";

function App() {
  return (
    <>
      <div>
        <Header teacherAvatar={true} />
      </div>
      <div className={styles.main}>
        <Sidebar />
        <div className={styles.schedule}>
          <ScheduleHeader />
          <div className={styles.scheduleMain}>
            <Outlet />
            {/* <SheduleAndPanel />
            <Calendar/> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
