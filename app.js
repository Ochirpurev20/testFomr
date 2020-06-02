const express = require("express");
const mysql = require("mysql");
const path = require("path");

const app = express();

app.use("/static", express.static(path.join(__dirname, "./static")));

app.get("/create", async (req, res) => {
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1111",
    database: "blog",
  });
  con.connect((err) => {
    if (err) throw err;
    console.log("connected");
    var sql =
      "INSERT INTO uussenTable (name,address) VALUES ('MERGENHOLDING', 'BGD 50R HOROO')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.send(result);
      console.log(`BICHLEG INSERTED MAN ${result}`);
    });
  });
  con.end();
});

app.get("/read", async (req, res) => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1111",
    database: "blog",
  });
  let table = "post";
  connection.connect();

  connection.query(`select * from ${table}`, (error, results, fields) => {
    if (error) {
      res.send({ status: "failed" });
      throw error;
    }
    res.send({ status: "ok", results });
    console.log("The solution is: ", results);
  });

  connection.end();
});

const port = 5500;

app.listen(port, (err) => {
  if (err) {
    logger.crit("app start err", err);
    return;
  }
  console.log("app started ...", port);
});
