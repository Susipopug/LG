import styles from "./HeaderModuleSmall.module.css";
import settings from "@assets/icons/settings.svg";
import exit from "@assets/icons/exit.svg";

interface HeaderModuleSmallProps {
  isAccountOpen: boolean;
}

export const HeaderModuleSmall = ({
  isAccountOpen,
}: HeaderModuleSmallProps) => {
  return (
    <>
      {isAccountOpen && (
        <nav className={styles.nav}>
          <h3 className={styles.navUser}>User</h3>
          <a className={styles.navItem}>
            <img src={settings} alt="settings" />
            <span>Настройки</span>
          </a>
          <a className={styles.navItem}>
            <img src={exit} alt="exit" />
            <span>Выйти из аккаунта</span>
          </a>
        </nav>
      )}
    </>
  );
};
