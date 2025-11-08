import { Header } from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ru";
import { ruRU } from "@mui/x-date-pickers/locales";
import Sidebar from "./modules/pages/Shedule/Sidebar/Sidebar";

interface AppProps {
  isLoggedIn: boolean;
}

function App({ isLoggedIn }: AppProps) {
  return (
    <>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="ru"
        localeText={
          ruRU.components.MuiLocalizationProvider.defaultProps.localeText
        }
      >
        {isLoggedIn ? (
          <>
            <div>
              <Header teacherAvatar={true} />
            </div>
            <div className={styles.main}>
              <Sidebar />
              <div className={styles.schedule}>
                <Outlet />
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <Header teacherAvatar={false} />
            </div>
            <div>
              <Outlet />
            </div>
          </>
        )}
      </LocalizationProvider>
    </>
  );
}

export default App;
