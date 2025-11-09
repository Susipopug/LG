import styles from "./Header.module.css";
import teacherAv from "@assets/icons/TeacherAvatar.svg";
import logo from "@assets/images/logoimage.svg";
import { Link } from "react-router-dom";
import { HeaderModuleSmall } from "./HeaderModule/HeaderModuleSmall";
import { useState } from "react";

interface HeaderProps {
  teacherAvatar?: boolean;
  isAccountOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ teacherAvatar }) => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const openUserAccount = () => {
    setIsAccountOpen(true);
  };

  return (
    <div className={styles.header}>
      <Link to={"/"} className={styles.logo}>
        <img src={logo} alt="logo" />
      </Link>
      {teacherAvatar && (
        <div onClick={openUserAccount} className={styles.teacherAvatar}>
          <img src={teacherAv} alt="teacherAvatar" />
          <h3>Мэри Поппинс</h3>
        </div>
      )}
      <HeaderModuleSmall isAccountOpen={isAccountOpen} />
    </div>
  );
};
