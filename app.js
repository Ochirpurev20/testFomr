const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use("front", express.static(path.join(__dirname, "./front")));

app.post("/api/create", async (req, res) => {
  //console.log(req.body);
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1111",
    database: "blog",
  });
  con.connect((err) => {
    if (err) throw err;
    console.log("connected via create");
    let createReq = req.body;
    console.log("createReq title: " + createReq.title);
    let table = "post";
    let sql = `INSERT INTO ${table} (title,content, created_dt, create_user_id) VALUES ('${createReq.title}', '${createReq.content}', '${createReq.date}','${createReq.user}')`;
    con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.send({ messege: "amjilttai frm server", err });
      }
      res.send({ status: "Amjilttai /frm server/", result });
      console.log({});
    });
    console.log(createReq);
  });

  //con.end();
});

app.get("/api/read", async (req, res) => {
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

app.get("/api/read/:id", async (req, res) => {
  const { id = "" } = req.params || {};
  if (!id) {
    return res.send({ post: null, error: { message: "invalid parameter" } });
  }
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1111",
    database: "blog",
  });
  let table = "post";
  con.connect((err) => {
    if (err) throw err;
    console.log("connected read id");
    const readReq = req.body;
    let counter, post;
    //`select id from ${table} limit ${readReq.limit}`;
    let sqlPost = `SELECT * FROM ${table}  where id = ${id} `;
    con.query(sqlPost, (err, result) => {
      if (err) {
        return res.send({ error: { message: err.message } });
      }
      // res.send(result);
      post = result[0] || null;
      console.log(post);
      return res.send({ post });
    });
  });
});
app.get("/api/user", async (req, res) => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1111",
    database: "blog",
  });
  console.log(`req is ${req}`);
  let table = "user";
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

/**
 * post iin delgerenguig butsaana
 */
app.post("/api/read/id", async (req, res) => {
  console.log(`id ni: ${req.body.id}`);
  let id = req.body.id;
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1111",
    database: "blog",
  });
  let table = "post";
  connection.connect((err) => {
    if (err) throw err;
    console.log("read/id dotroos ");
    let sql = `SELECT * FROM ${table} WHERE id =${id}`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      let data1 = result;
      res.send(result);
      console.log(result);
    });
    connection.end();
  });
});

app.delete("/api/delete", async (req, res) => {
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1111",
    database: "blog",
  });
  con.connect((err) => {
    if (err) throw err;
    console.log("connected through delete");
    let deleteReq = req.body;
    console.log(`deleteReq.id===${deleteReq.id} `);
    let table = "post";
    var sql = `DELETE FROM ${table}  WHERE id = '${deleteReq.id}'`;
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
      console.log(`deleted`);
    });
    console.log(deleteReq.id);
  });
});

app.put("/api/update", async (req, res) => {
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1111",
    database: "blog",
  });
  con.connect((err) => {
    if (err) throw err;
    console.log("Connected through update");
    let updateReq = req.body;
    let table = "post";
    let sql = `UPDATE ${table} SET title='${updateReq.title}', content='${updateReq.content}' , update_user_id='${updateReq.user}' , updated_dt='${updateReq.date}' WHERE id='${updateReq.id}'`;
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
      console.log(`updated`);
    });
    console.log(updateReq);
  });
});

const port = 5500;

app.listen(port, (err) => {
  if (err) {
    logger.crit("app start err", err);
    return;
  }
  console.log("app started ...", port);
});
