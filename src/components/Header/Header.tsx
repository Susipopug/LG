import styles from "./Header.module.css";
import logoimage from "@assets/images/logoimage.svg";
import ledgio from "@assets/images/ledgio.svg";

export const Header = () => {
  return (
    <div className={styles.header}>
      <img src={logoimage} alt="logoimage" />
      <img src={ledgio} alt="ledgio" />
    </div>
  );
};
