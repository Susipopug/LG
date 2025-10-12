import styles from "./Header.module.css";
import teacherAv from "@assets/icons/TeacherAvatar.svg";
import logo from "@assets/images/logoimage.svg";

interface HeaderProps {
  teacherAvatar?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ teacherAvatar }) => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
      {teacherAvatar && (
        <div className={styles.teacherAvatar}>
          <img src={teacherAv} alt="teacherAvatar" />
          <h3>Мэри Поппинс</h3>
        </div>
      )}
    </div>
  );
};
