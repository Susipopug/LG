import styles from "./Sidebar.module.css";
import home from "@assets/icons/home.svg";
import calendar from "@assets/icons/calendar.svg";
import user from "@assets/icons/user.svg";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <div className={styles.inlineMenuItem}>
          <img src={home} alt="home" /> <a href="#">Главная</a>
        </div>
        <div className={styles.inlineMenuItem}>
          <img src={calendar} alt="calendar" /> <a href="#">Календарь</a>
        </div>
        <div className={styles.inlineMenuItem}>
          <img src={user} alt="user" /> <a href="#">Ученики</a>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
