import styles from "./section.module.scss";

const Section = ({ title, className = "" }) => {
  return (
    <section className={`${styles.sectionContainer} ${className}`}>
      <p className={styles.sectionContainer__title}>{title}</p>
    </section>
  );
};

export default Section;
