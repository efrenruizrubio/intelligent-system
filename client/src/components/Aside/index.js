import { Link } from "react-router-dom";
import styles from "./aside.module.scss";
/* import { useContext } from "react";
import UserContext from "context/UserContext"; */

const links = [
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Enfermedades",
    path: "/dashboard/diseases",
  },
  {
    name: "Pacientes",
    path: "/dashboard/patients",
  },
  {
    name: "Historial clínico",
    path: "/dashboard/history",
  },
];

const Aside = ({ title, className = "" }) => {
  return (
    <aside className={`${styles.aside} ${className}`}>
      <h2 className={styles.aside__title}>{title}</h2>
      <nav className={styles.aside__nav}>
        <ul className={styles.aside__nav__ul}>
          {links.map(({ name, path }) => (
            <>
              <li className={styles["aside__nav--item"]}>
                <Link className={styles.aside__nav__a} to={path}>
                  {name}
                </Link>
              </li>
            </>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Aside;
