import styles from "./Header.module.css";
import teacherAv from "@assets/icons/TeacherAvatar.svg";
import logo from "@assets/images/logoimage.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { HeaderModalSmall } from "./HeaderModalSmall";

interface HeaderProps {
  teacherAvatar?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ teacherAvatar }) => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const openUserAccount = () => {
    setIsAccountOpen(!isAccountOpen);
  };

  console.log("Header");

  return (
    <div className={styles.header}>
      <Link to={"/"} className={styles.logo}>
        <img height={40} width={31} src={logo} alt="logo" />
      </Link>
      {teacherAvatar && (
        <div onClick={openUserAccount} className={styles.teacherAvatar}>
          <img height={32} width={32} src={teacherAv} alt="teacherAvatar" />
          <h3>Мэри Поппинс</h3>
        </div>
      )}
      <HeaderModalSmall
        isAccountOpen={isAccountOpen}
        setIsAccountOpen={setIsAccountOpen}
      />
    </div>
  );
};
