import styles from "./dashboard.module.scss";
import { useState } from "react";

const DashboardPage = () => {
  const [userType, setUserType] = useState(0);

  if (!userType) {
    return (
      <div className={styles.div}>
        <h1 className={styles.div__title}>Dashboard</h1>
        <p className={styles.div__p}>
          Bienvenido al <strong>Sistema de Diagnóstico Inteligente</strong>
          <br />
          <br />
          Como administrador del sistema, cuenta con todas las funcionalidades
          del sistema.
          <br />
          <br />
          Para hacer uso del sistema, utilizar la barra lateral para moverse
          entre las funcionalidades.
        </p>
      </div>
    );
  } else {
    return (
      <div className={styles.div}>
        <h1 className={styles.div__title}>Dashboard</h1>
        <p className={styles.div__p}>
          Bienvenido al <strong>Sistema de Diagnóstico Inteligente</strong>
          <br />
          <br />
          Como doctor del sistema, cuenta con las funcionalidades de registrar
          pacientes y generar historiales clínicos.
          <br />
          <br />
          Para hacer uso del sistema, utilizar la barra lateral para moverse
          entre las funcionalidades.
        </p>
      </div>
    );
  }
};

export default DashboardPage;
