import styles from "./header.module.scss";

const Header = ({ title, className = "" }) => {
  return (
    <header className={`${styles.headerContainer} ${className}`}>
      <span className={styles.headerContainer__title}>{title}</span>
    </header>
  );
};

export default Header;
