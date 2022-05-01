import styles from "./maincontainer.module.scss";

const MainContainer = ({ ...props }) => {
  return <main className={styles.mainContainer}>{props.children}</main>;
};

export default MainContainer;
