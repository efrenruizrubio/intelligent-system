import styles from "./DiseasesComponent.module.scss";
import Swal from "sweetalert2";
import { Button, Table, Input } from "components";
import { useEffect, useState } from "react";
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
  const columnsDisease = [
    { head: "ID", value: "disease_id" },
    { head: "Nombre de la enfermedad", value: "name" },
  ];
  const columns = [
    { head: "Signos", value: "sign_description" },
    { head: "Síntomas", value: "symptom_description" },
  ];

  const [disease, setDisease] = useState("");
  const [sign, setSign] = useState("");
  const [symptom, setSymptom] = useState("");
  const [signCounter, setSignCounter] = useState(1);
  const [symptomCounter, setSymptomCounter] = useState(1);
  const [blockSignButton, setBlockSignButton] = useState(true);
  const [blockSymptomButton, setBlockSymptomButton] = useState(true);
  const [blockSendButton, setBlockSendButton] = useState(true);
  const [diseaseId, setDiseaseId] = useState(undefined);
  const [diseases, setDiseases] = useState({
    diseases: {},
    signs: {},
    symptoms: {},
  });

  useEffect(() => {
    Axios.post("http://localhost:3001/diseases").then((res) => {
      setDiseases(res.data);
    });
  }, []);

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
  useEffect(() => {
    if (diseaseId) {
      Axios.post("http://localhost:3001/register/disease-properties", {
        sign: sign,
        symptom: symptom,
        fk_disease_id: diseaseId,
      }).then((res) => {
        console.log(res.data);
      });
    }
  }, [diseaseId, sign, symptom]);

  const handleClickSign = (string) => {
    if (string === "add") {
      setSignCounter(signCounter + 1);
    } else if (string === "remove" && signCounter > 1) {
      setSignCounter(signCounter - 1);
      delete sign[signCounter - 1];
    } else return;
  };

  const handleClickSymptom = (string) => {
    if (string === "add") {
      setSymptomCounter(symptomCounter + 1);
    } else if (string === "remove" && symptomCounter > 1) {
      setSymptomCounter(symptomCounter - 1);
      delete symptom[symptomCounter - 1];
    } else return;
  };

  const handleOnChangeSign = (e) => {
    const abc = {};
    abc[e.target.id] = e.target.value;
    setSign({ ...sign, ...abc });
  };

  const handleOnChangeSymptom = (e) => {
    const abc = {};
    abc[e.target.id] = e.target.value;
    setSymptom({ ...symptom, ...abc });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBlockSendButton(true);

    Axios.post("http://localhost:3001/register/disease", {
      disease: disease,
    }).then((res) => {
      console.log(res);
      if (res.data.code === "ER_DUP_ENTRY") {
        Error.fire({
          title:
            "No se puede registrar debido a que la enfermedad ya se encuentra en la base de datos",
          icon: "error",
        });
      }
      if (res.data.status === "success") {
        setDiseaseId(res.data.id);
        Toast.fire({
          title: "Registro exitoso",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.container__title}>Diseases</h1>

      {/* {Object.values(symptoms).map((c, i) => {
        return <p>{symptoms[c]}</p>;
      })} */}

      <Table data={diseases} headDisease={columnsDisease} />
      <fieldset className={styles.fieldset}>
        <legend>Registro de enfermedad</legend>
        <form className={styles.fieldset__form} onSubmit={handleSubmit}>
          <span>Nombre</span>
          <Input
            className={styles.container__form__input}
            placeholder="Nombre de la enfermedad"
            value={disease}
            type="text"
            setValue={(e) => setDisease(e.target.value)}
          />
          <span>Signo(s)</span>
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
          <span id={styles.symptomSpan}>Síntoma(s)</span>
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
