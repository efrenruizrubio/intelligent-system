import styles from "./login.module.scss";
import logo from "assets/img/logo.png";
import { useState } from "react";
import { Input, Particles } from "components";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Particles />
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
            <input type="submit" value="Iniciar sesión" />
          </form>
        </fieldset>
      </main>
    </>
  );
};

export default LoginForm;
