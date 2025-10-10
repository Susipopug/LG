import styles from "./Sidebar.module.css";
import { Link } from "react-router";
import support from "@assets/icons/support.svg";
import { HomeIcon } from "@/assets/icons/HomeIcon";
import { useState } from "react";
import { CalendarIcon } from "@/assets/icons/CalendarIcon";
import { StudentsIcon } from "@/assets/icons/StudentsIcon";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("home");

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <div
          onClick={() => setActiveItem("home")}
          className={`${styles.inlineMenuItem} ${
            activeItem === "home" ? styles.active : ""
          }`}
        >
          <HomeIcon color={activeItem === "home" ? "#1890FF" : "#000000"} />

          <a href="#">Главная</a>
        </div>
        <div
          onClick={() => setActiveItem("calendar")}
          className={`${styles.inlineMenuItem} ${
            activeItem === "calendar" ? styles.active : ""
          }`}
        >
          <CalendarIcon
            color={activeItem === "calendar" ? "#1890FF" : "#000000"}
          />
          <Link to={"/calendar"}>Календарь </Link>
        </div>
        <div
          onClick={() => setActiveItem("students")}
          className={`${styles.inlineMenuItem} ${
            activeItem === "students" ? styles.active : ""
          }`}
        >
          <StudentsIcon
            color={activeItem === "students" ? "#1890FF" : "#000000"}
          />
          <a href="#">Ученики</a>
        </div>
      </nav>
      <div className={styles.inlineMenuItemBottom}>
        <img src={support} alt="home" /> <a href="#">Поддержка и ресурсы</a>
      </div>
    </aside>
  );
};

export default Sidebar;
