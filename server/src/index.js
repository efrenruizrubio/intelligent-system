const express = require("express");
require("dotenv").config();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: process.env.REACT_APP_DB_HOST,
  user: process.env.REACT_APP_DB_USER,
  password: process.env.REACT_APP_DB_PASSWORD,
  database: process.env.REACT_APP_DB_DATABASE,
});

db.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  app.post("/register", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const userType = req.body.userType;
    salt = bcrypt.genSaltSync(10);

    bcrypt.hash(req.body.password, salt, function (err, hash) {
      if (err) {
        return;
      }
      db.query(
        "INSERT INTO user (name, email, password, user_type) VALUES (?,?,?,?)",
        [name, email, hash, userType],
        (err, res) => {
          console.log(err || res);
        }
      );
    });
  });
});

/* bcrypt.compare(password, hashedPassword, async function (err, isMatch) {
      if (isMatch) {
        console.log("Encrypted password is: ", password);
        console.log("Decrypted password is: ", hashedPassword);
      }

      if (!isMatch) {
        console.log(hashedPassword + " is not encryption of " + password);
      }
    }); */

app.listen(3001, () => {
  console.log("Server running on port 3001");
});