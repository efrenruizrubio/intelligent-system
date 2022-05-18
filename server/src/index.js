const express = require("express");
require("dotenv").config();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3001, () => {
  console.log("Server running on port 3001");
});

const credentials = {
  host: process.env.REACT_APP_DB_HOST,
  user: process.env.REACT_APP_DB_USER,
  password: process.env.REACT_APP_DB_PASSWORD,
  database: process.env.REACT_APP_DB_DATABASE,
};

app.post("/register/user", (req, res) => {
  const db = mysql.createConnection(credentials);

  db.connect(function (err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    const name = req.body.name;
    const email = req.body.email;
    const userType = req.body.userType;
    salt = bcrypt.genSaltSync(10);

    bcrypt.hash(req.body.password, 10, function (err, hash) {
      if (err) {
        return;
      }
      db.query(
        "INSERT INTO user (name, email, password, user_type) VALUES (?,?,?,?)",
        [name, email, hash, userType],
        (err, result) => {
          if (err) {
            return;
          }
          if (result.affectedRows) {
            res.send("success");
            db.end();
          }
        }
      );
    });
  });
});

app.post("/login", (req, res) => {
  const db = mysql.createConnection(credentials);

  db.connect(function (err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM user WHERE email = ?", [email], (err, result) => {
      if (err) {
        return;
      }
      if (result.length === 0) {
        res.send("not-found");
      } else {
        bcrypt.compare(
          password,
          result[0].password,
          async function (err, isMatch) {
            if (err) {
              return;
            }
            if (isMatch) {
              res.send({ status: "success", result: result[0] });
              db.end();
            } else {
              res.send("wrong-password");
            }
          }
        );
      }
    });
  });
});

app.post("/register/disease", (req, res) => {
  const db = mysql.createConnection(credentials);

  db.connect(function (err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    const disease = req.body.disease;

    db.query(
      "INSERT INTO disease (name) VALUES (?)",
      [disease],
      (err, result) => {
        if (err) {
          return res.send(err);
        }
        return res.send({ status: "success", id: result.insertId });
      }
    );
  });
});

app.post("/register/disease-properties", (req, res) => {
  const diseaseId = req.body.fk_disease_id;
  const db = mysql.createConnection(credentials);

  db.connect(function (err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    const sign = req.body.sign;
    const symptom = req.body.symptom;

    Object.values(sign).map((value) => {
      db.query(
        "INSERT INTO sign (description, fk_disease_id) VALUES (?,?)",
        [value, diseaseId],
        (err) => {
          if (err) {
            return res.send(err);
          }
        }
      );
    });

    Object.values(symptom).map((value) => {
      db.query(
        "INSERT INTO symptom (description, fk_disease_id) VALUES (?,?)",
        [value, diseaseId],
        (err) => {
          if (err) {
            return res.send(err);
          }
        }
      );
    });
    return res.send("success");
  });
});

app.post("/diseases", (req, res) => {
  const db = mysql.createConnection(credentials);
  var resultData = {
    diseases: [],
    signs: [],
    symptoms: [],
  };

  db.connect(function (err) {
    if (err) {
      console.error("error connecting: " + err.stack);
    }
    db.query("SELECT disease_id, name FROM disease", (err, result) => {
      if (err) {
        res.send(err);
      }
      resultData.diseases = result;
    });

    db.query(
      "SELECT sign_description, fk_disease_id FROM sign",
      (err, result) => {
        if (err) {
          res.send(err);
        }
        resultData.signs = result;
      }
    );

    db.query(
      "SELECT symptom_description, fk_disease_id FROM symptom",
      (err, result) => {
        if (err) {
          res.send(err);
        }
        resultData.symptoms = result;

        res.send(resultData);
      }
    );
  });
});
