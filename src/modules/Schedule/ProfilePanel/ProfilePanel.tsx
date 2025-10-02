import styles from "./ProfilePanel.module.css";

export const ProfilePanel = () => {
  return (
    <div className={styles.panel}>
      <div className={styles.profile}>
        <div className={styles.avatarLarge}>Д</div>
        <div className={styles.name}>Джон Траволта</div>
      </div>
      <div className={styles.comment}>
        <h3>Комментарий к занятию</h3>
        <textarea placeholder="Введите комментарий..."></textarea>
      </div>
      <div className={styles.statusSection}>
        <h3>Статус занятия</h3>
        <div className={styles.buttons}>
          <button className={styles.btnSuccess}>Проведено</button>
          <button className={styles.btnSecondary}>Пропущено</button>
          <button className={styles.btnSecondary}>Отменено</button>
        </div>
      </div>
    </div>
  );
};
