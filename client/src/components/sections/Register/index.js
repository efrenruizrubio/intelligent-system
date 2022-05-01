import styles from "./register.module.scss";
import logo from "assets/img/logo.png";
import { useState } from "react";
import { Input } from "components";
import { Link } from "react-router-dom";
import Axios from "axios";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:3001/register", {
      name: name,
      email: email,
      password: password,
      userType: userType,
    }).then((res) => {
      console.log(res);
    });
  };
  return (
    <>
      <main className={styles.container}>
        <img src={logo} alt="logo" width={1378} height={1378} />
        <fieldset className={styles.fieldset}>
          <legend>Registrarse</legend>
          <form className={styles.fieldset__form} onSubmit={handleSubmit}>
            <Input
              className={styles.container__form__input}
              placeholder="Nombre completo"
              value={name}
              type="text"
              setValue={(e) => setName(e.target.value)}
            />
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
            <Input
              className={styles.container__form__input}
              placeholder="Tipo de usuario"
              value={userType}
              type="list"
              setValue={(e) => setUserType(e.target.value)}
            />
            <Link to="/" className={styles.fieldset__form__link}>
              ¿Ya tienes cuenta? Inicia sesión
            </Link>
            <input type="submit" value="Registrarse" />
          </form>
        </fieldset>
      </main>
    </>
  );
};

export default RegisterForm;
