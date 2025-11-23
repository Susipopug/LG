import styles from "./HeaderModalSmall.module.css";
import settings from "@assets/icons/settings.svg";
import exit from "@assets/icons/exit.svg";
import { CloseOutlined } from "@ant-design/icons";
import { HeaderModalLarge } from "../HeaderModalLarge";
import { useState } from "react";

interface HeaderModuleSmallProps {
  isAccountOpen: boolean;
  setIsAccountOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HeaderModalSmall = ({
  isAccountOpen,
  setIsAccountOpen,
}: HeaderModuleSmallProps) => {
  const [isModalLargeOpen, setIsModalLargeOpen] = useState(false);

  const onModalLargeClose = () => {
    setIsModalLargeOpen(false);
  };
  return (
    <>
      {isAccountOpen && (
        <>
          <div className={styles.headerModal}>
            <CloseOutlined
              onClick={() => setIsAccountOpen(false)}
              className={styles.closeButton}
            />
            <div className={styles.navUserLine}> </div>
            <nav className={styles.nav}>
              <h3 className={styles.navUser}>User</h3>

              <button
                onClick={() => setIsModalLargeOpen(true)}
                className={styles.navItem}
              >
                <img src={settings} alt="settings" />
                <span>Настройки</span>
              </button>
              <a className={styles.navItem}>
                <img src={exit} alt="exit" />
                <span>Выйти из аккаунта</span>
              </a>
            </nav>
            <HeaderModalLarge
              isModalLargeOpen={isModalLargeOpen}
              onModalLargeClose={onModalLargeClose}
            />
          </div>
        </>
      )}
    </>
  );
};
