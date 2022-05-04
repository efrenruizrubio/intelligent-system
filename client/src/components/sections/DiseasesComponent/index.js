import styles from "./DiseasesComponent.module.scss";
import Swal from "sweetalert2";
import { Button, Table, Input } from "components";
import { useContext, useEffect, useState } from "react";
import UserContext from "context/UserContext";
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

const Error = Swal.mixin({
  customClass: {
    text: "swal__container",
  },
  toast: true,
  position: "center",
  background: "#2FD0B1",
  confirmButtonColor: "#1B847D",
  padding: "2rem",
  width: 600,
});

export const DiseasesComponent = () => {
  const { user } = useContext(UserContext);
  const columns = [
    { head: "ID", value: "user_id" },
    { head: "Nombre completo", value: "name" },
    { head: "Correo electrónico", value: "email" },
    { head: "Tipo de usuario", value: "user_type" },
  ];

  const [disease, setDisease] = useState("");
  const [sign, setSign] = useState("");
  const [symptom, setSymptom] = useState("");
  const [signCounter, setSignCounter] = useState(1);
  const [symptomCounter, setSymptomCounter] = useState(1);
  const [blockSignButton, setBlockSignButton] = useState(true);
  const [blockSymptomButton, setBlockSymptomButton] = useState(true);
  const [blockSendButton, setBlockSendButton] = useState(true);

  useEffect(() => {
    if (signCounter > 1) setBlockSignButton(false);
    else setBlockSignButton(true);
  }, [signCounter]);

  useEffect(() => {
    if (symptomCounter > 1) setBlockSymptomButton(false);
    else setBlockSymptomButton(true);
  }, [symptomCounter]);

  useEffect(() => {
    if (
      disease &&
      Object.values(sign)[0] &&
      sign &&
      Object.values(symptom)[0] &&
      symptom
    )
      setBlockSendButton(false);
    else setBlockSendButton(true);
  }, [disease, sign, symptom]);

  const handleClickSign = (string) => {
    if (string === "add") {
      setSignCounter(signCounter + 1);
      console.log(signCounter);
    } else if (string === "remove" && signCounter > 1) {
      setSignCounter(signCounter - 1);
      delete sign[signCounter - 1];
      console.log(signCounter);
    } else return;
  };

  const handleClickSymptom = (string) => {
    if (string === "add") {
      setSymptomCounter(symptomCounter + 1);
      console.log(symptomCounter);
    } else if (string === "remove" && symptomCounter > 1) {
      setSymptomCounter(symptomCounter - 1);
      delete symptom[symptomCounter - 1];
      console.log(symptomCounter);
    } else return;
  };

  const handleOnChangeSign = (e) => {
    const abc = {};
    abc[e.target.id] = e.target.value;
    setSign({ ...sign, ...abc });
    console.log(sign);
  };

  const handleOnChangeSymptom = (e) => {
    const abc = {};
    abc[e.target.id] = e.target.value;
    setSymptom({ ...symptom, ...abc });
    console.log(symptom);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBlockSendButton(true);

    Axios.post("http://localhost:3001/register/disease", {
      disease: disease,
      sign: sign,
      symptom: symptom,
    }).then((res) => {
      if (res.data.code === "ER_DUP_ENTRY") {
        Error.fire({
          title:
            "No se puede registrar debido a que la enfermedad ya se encuentra en la base de datos",
          icon: "error",
        });
      }
      if (res.data.status === "success") {
        Toast.fire({
          title: "Registro exitoso",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
          }
        });
      }
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.container__title}>Diseases</h1>

      {/* {Object.keys(sign).map((c, i) => {
        return <p>{sign[c]}</p>;
      })} */}

      <Table data={user} columns={columns}></Table>
      <fieldset className={styles.fieldset}>
        <legend>Registro de enfermedad</legend>
        <form className={styles.fieldset__form} onSubmit={handleSubmit}>
          <Input
            className={styles.container__form__input}
            placeholder="Nombre de la enfermedad"
            value={disease}
            type="text"
            setValue={(e) => setDisease(e.target.value)}
          />
          {Array.from(Array(signCounter)).map((c, index) => {
            return (
              <Input
                className={styles.container__form__input}
                onChange={handleOnChangeSign}
                key={c}
                placeholder="Signo"
                id={index}
                type="text"
              ></Input>
            );
          })}
          <div className={styles.container__form__div}>
            <Button
              type={"button"}
              value={"Agregar signo"}
              onClick={() => handleClickSign("add")}
            />
            <Button
              type={"button"}
              value={"Remover signo"}
              disabled={blockSignButton}
              onClick={() => handleClickSign("remove")}
            />
          </div>
          {Array.from(Array(symptomCounter)).map((c, index) => {
            return (
              <Input
                className={styles.container__form__input}
                onChange={handleOnChangeSymptom}
                key={c}
                placeholder="Síntoma"
                id={1000 + index}
                type="text"
              ></Input>
            );
          })}
          <div className={styles.container__form__div}>
            <Button
              type={"button"}
              value={"Agregar síntoma"}
              onClick={() => handleClickSymptom("add")}
            />
            <Button
              type={"button"}
              value={"Remover síntoma"}
              disabled={blockSymptomButton}
              onClick={() => handleClickSymptom("remove")}
            />
          </div>
          <Button
            className={styles.sendButton}
            disabled={blockSendButton}
            value={"Registrar"}
          />
        </form>
      </fieldset>
    </div>
  );
};
