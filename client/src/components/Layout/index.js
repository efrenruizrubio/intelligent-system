import { Header, Aside } from "components";
import { useContext, useEffect } from "react";
import styles from "./Layout.module.scss";
import { useNavigate, Outlet } from "react-router-dom";
import UserContext from "context/UserContext";

export const Layout = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!Object.keys(user).length) {
      navigate("/");
    }
  });

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
