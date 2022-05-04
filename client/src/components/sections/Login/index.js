import styles from "./login.module.scss";
import logo from "assets/img/logo.png";
import { useState, useContext, useEffect } from "react";
import { Input, Button } from "components";
import { Link, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import Axios from "axios";
import UserContext from "context/UserContext";

const Toast = Swal.mixin({
  customClass: {
    text: "swal__container",
  },
  toast: true,
  position: "center",
  background: "#2FD0B1",
  confirmButtonColor: "#1B847D",
  padding: "2rem",
  timer: 2000,
  timerProgressBar: true,
});

const LoginForm = () => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [blockButton, setBlockButton] = useState(true);

  useEffect(() => {
    if (email && password) {
      setBlockButton(false);
    } else {
      setBlockButton(true);
    }
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setBlockButton(true);
    Axios.post("http://localhost:3001/login", {
      email: email,
      password: password,
    }).then((res) => {
      if (res.data === "not-found") {
        Toast.fire({
          title: "No se encuentra el correo",
          icon: "error",
        });
      } else if (res.data === "wrong-password") {
        Toast.fire({
          title: "La contraseña es incorrecta",
          icon: "error",
        });
      } else if (res.data.status === "success") {
        setUser(res.data.result);
        Toast.fire({
          title: "Acceso exitoso",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            setIsLoggedIn(true);
          }
        });
      }
    });
  };
  return (
    <>
      {isLoggedIn ? <Navigate to="/dashboard" /> : null}
      <main className={styles.container}>
        <img src={logo} alt="logo" width={1378} height={1378} />
        <fieldset className={styles.fieldset}>
          <legend>Inicio de sesión</legend>
          <form className={styles.fieldset__form} onSubmit={handleSubmit}>
            <Input
              className={styles.container__form__input}
              placeholder="Correo"
              value={email}
              type="email"
              setValue={(e) => setEmail(e.target.value)}
            />
            <Input
              className={styles.container__form__input}
              placeholder="Contraseña"
              value={password}
              type="password"
              setValue={(e) => setPassword(e.target.value)}
            />
            <Link to="/register" className={styles.fieldset__form__link}>
              Registrarse
            </Link>
            <Button
              value="Iniciar sesión"
              disabled={blockButton}
              className={styles.button}
            />
          </form>
        </fieldset>
      </main>
    </>
  );
};

export default LoginForm;
