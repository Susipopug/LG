import { Header } from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "./modules/Schedule/Sidebar/Sidebar";
import styles from "./App.module.css";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ru";
import { ruRU } from "@mui/x-date-pickers/locales";

function App() {
  return (
    <>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="ru"
        localeText={
          ruRU.components.MuiLocalizationProvider.defaultProps.localeText
        }
      >
        <div>
          <Header teacherAvatar={true} />
        </div>
        <div className={styles.main}>
          <Sidebar />
          <div className={styles.schedule}>
            <Outlet />
          </div>
        </div>
      </LocalizationProvider>
    </>
  );
}

export default App;
