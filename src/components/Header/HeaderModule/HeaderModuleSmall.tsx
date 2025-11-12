import styles from "./HeaderModuleSmall.module.css";
import settings from "@assets/icons/settings.svg";
import exit from "@assets/icons/exit.svg";
import { CloseOutlined } from "@ant-design/icons";

interface HeaderModuleSmallProps {
  isAccountOpen: boolean;
  setIsAccountOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HeaderModuleSmall = ({
  isAccountOpen,
  setIsAccountOpen,
}: HeaderModuleSmallProps) => {
  return (
    <>
      {isAccountOpen && (
        <nav className={styles.nav}>
          <CloseOutlined
            onClick={() => setIsAccountOpen(false)}
            className={`${styles.navItem} ${styles.closeButton}`}
          />

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
