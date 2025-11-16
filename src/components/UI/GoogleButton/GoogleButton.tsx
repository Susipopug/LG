import styles from "@components/UI/GoogleButton/GoogleButton.module.css";
import google from "@assets/images/google.svg";

export const GoogleButton = () => {
  return (
    <>
      <div className={styles.separator}>
        <span className={styles.text}>или</span>
      </div>
      <button className={styles.googleButton}>
        <img src={google} alt="Google" className={styles.googleIcon} />
        Google
      </button>
    </>
  );
};
