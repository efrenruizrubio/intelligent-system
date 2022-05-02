import styles from "./list.module.scss";

export const List = ({ items }) => {
  return (
    <ul className={`${styles.listContainer}`}>
      {items.map((item, index) => {
        return <li key={index}>{item}</li>;
      })}
    </ul>
  );
};
