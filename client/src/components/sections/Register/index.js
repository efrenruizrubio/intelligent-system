import styles from "./register.module.scss";
import logo from "assets/img/logo.png";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { Input } from "components";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

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

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState();
  const [blockButton, setBlockButton] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (name && email && password && userType) setBlockButton(false);
    else setBlockButton(true);
  }, [name, email, password, userType]);

  const handleChangeType = (event) => {
    setUserType(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBlockButton(true);

    Axios.post("http://localhost:3001/register/user", {
      name: name,
      email: email,
      password: password,
      userType: userType === "Administrador" ? 0 : 1,
    }).then((res) => {
      if (res.data === "success") {
        Toast.fire({
          title: "Acceso exitoso",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            navigate("/");
          }
        });
      }
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
              setValue={handleChangeType}
            />
            <Link to="/" className={styles.fieldset__form__link}>
              ¿Ya tienes cuenta? Inicia sesión
            </Link>
            <button
              type="submit"
              disabled={blockButton}
              className={styles.container__form__button}
            >
              Registrarse
            </button>
          </form>
        </fieldset>
      </main>
    </>
  );
};

export default RegisterForm;
