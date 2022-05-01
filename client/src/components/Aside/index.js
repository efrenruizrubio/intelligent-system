import styles from "./aside.module.scss";

const Aside = ({ title, className = "" }) => {
  return (
    <aside className={`${styles.asideContainer} ${className}`}>
      <p className={styles.asideContainer__title}>{title}</p>
    </aside>
  );
};

export default Aside;
