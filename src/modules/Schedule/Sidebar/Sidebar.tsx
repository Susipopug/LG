import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <a href="#">📅 Расписание</a>
        <a href="#">📆 Календарь</a>
        <a href="#">👩‍🎓 Ученики</a>
        <a href="#">⚙️ Настройки</a>
      </nav>
    </aside>
  );
};

export default Sidebar;
