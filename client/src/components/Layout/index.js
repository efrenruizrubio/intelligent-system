import { Header, Aside } from "components";
import styles from "./Layout.module.scss";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <Header title={"Bienvenido"} />
      <div className={styles.layout}>
        <Aside title={"Navegación"} />
        <main className={styles.container}>
          <Outlet />
        </main>
      </div>
    </>
  );
};
