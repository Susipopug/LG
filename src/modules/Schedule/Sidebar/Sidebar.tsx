import styles from "./Sidebar.module.css";
import { Link, useLocation } from "react-router";
import support from "@assets/icons/support.svg";
import { HomeIcon } from "@/assets/icons/HomeIcon";
import { CalendarIcon } from "@/assets/icons/CalendarIcon";
import { StudentsIcon } from "@/assets/icons/StudentsIcon";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Определяем активный элемент по пути
  let activeItem = "";
  if (currentPath === "/" || currentPath === "/main") {
    activeItem = "home";
  } else if (currentPath === "/calendar") {
    activeItem = "calendar";
  } else if (currentPath.startsWith("/students")) {
    activeItem = "students";
  }

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <Link
          to={"/main"}
          className={`${styles.sidebarMenuItem} ${
            activeItem === "home" ? styles.active : ""
          }`}
        >
          <HomeIcon color={activeItem === "home" ? "#1890FF" : "#000000"} />

          <p
            className={`${styles.sidebarMenuItemText} ${
              activeItem === "home" ? styles.activeText : ""
            }`}
          >
            Главная
          </p>
        </Link>

        <Link
          to={"/calendar"}
          className={`${styles.sidebarMenuItem} ${
            activeItem === "calendar" ? styles.active : ""
          }`}
        >
          <CalendarIcon
            color={activeItem === "calendar" ? "#1890FF" : "#000000"}
          />
          <p
            className={`${styles.sidebarItemText} ${
              activeItem === "calendar" ? styles.activeText : ""
            }`}
          >
            Календарь{" "}
          </p>
        </Link>

        <div
          className={`${styles.sidebarMenuItem} ${
            activeItem === "students" ? styles.active : ""
          }`}
        >
          <StudentsIcon
            color={activeItem === "students" ? "#1890FF" : "#000000"}
          />
          <a href="#">Ученики</a>
        </div>
      </nav>
      <div className={styles.sidebarBottom}>
        <img src={support} alt="home" /> <a href="#">Поддержка и ресурсы</a>
      </div>
    </aside>
  );
};

export default Sidebar;
