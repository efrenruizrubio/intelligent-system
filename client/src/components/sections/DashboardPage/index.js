import styles from "./dashboard.module.scss";
import { useContext } from "react";
import UserContext from "context/UserContext";
import React from "react";

const DashboardPage = () => {
  const { user } = useContext(UserContext);

  return (
    <div className={styles.div}>
      <h1 className={styles.div__title}>Dashboard</h1>
      <p className={styles.div__p}>
        Bienvenido al <strong>Sistema de Diagnóstico Inteligente</strong>
        <br />
        <br />
        {user.user_type
          ? `Como doctor del sistema, cuenta con las
              funcionalidades de registrar pacientes y generar historiales
              clínicos.`
          : `Como administrador del sistema, cuenta con todas
              las funcionalidades del sistema.`}
        <br />
        <br />
        Para hacer uso del sistema, utilizar la barra lateral
        <strong> Navegación</strong> para moverse entre las funcionalidades.
      </p>
    </div>
  );
};

export default DashboardPage;
