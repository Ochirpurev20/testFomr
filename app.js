const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use("/static", express.static(path.join(__dirname, "./static")));

app.post("/create", async (req, res) => {
  console.log(req.body);
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1111",
    database: "blog",
  });
  con
    .connect((err) => {
      if (err) throw err;
      console.log("connected via create");
      let createReq = req.body;
      let date = new Date(createReq.date);
      let table = "post";
      var sql = `INSERT INTO ${table} (title,content, created_dt, create_user_id) VALUES ('${createReq.title}', '${createReq.content}', '${createReq.date}','${createReq.user}')`;
      con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
      });
      console.log(createReq);
    })
    .then(con.end());
  //con.end();
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
app.get("/test_detail", async (req, res) => {
  console.log(`id ni: ${req.query.id}`);
  let id = req.query.id;
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1111",
    database: "blog",
  });
  let table = "post";
  connection.connect((err) => {
    if (err) throw err;
    console.log("test detail r ");
    let sql = `SELECT * FROM ${table} WHERE id =${id}`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      let data1 = result;
      res.send(`<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" href="/static/style.css" />
          <title>detail</title>
        </head>
        <body>
    <div class="container">
      <ul class="navbar">
        <li><a href="/static/index.html">Home</a></li>

        <li><a href="/static/list.html">Jagsaalt</a></li>
      </ul>
      <div id="containerDiv">
        <div id="contentDiv">
          <h2 id="head1">${data1[0].title}</h2>
          <br />
          <p id="content1">
            ${data1[0].content}
          </p>
          <br />
          <p id="user1">${data1[0].user_id}</p>
          <p id="date1">${data1[0].created_dt} </p>
        </div>

        <button onclick="myFunc()">edit</button>
      </div>
    </div>
    <script>
      function myFunc() {
        var head1 = document.getElementById("head1");
        var content1 = document.getElementById("content1");
        var user1 = document.getElementById("user1");
        var date1 = document.getElementById("date1");
        if (head1 != null) {
          head1.remove();
          content1.remove();
          user1.remove();
          date1.remove();
          let head2 = document.createElement("input");
          head2.type = "text";
          head2.id = "title";
          let brs = document.createElement("BR")
          document
            .getElementById("contentDiv")
            .insertAdjacentElement("afterbegin", head2);
            
          head2.value = '${data1[0].title}';
          document
            .getElementById("contentDiv")
            .insertAdjacentElement("beforeend", brs);
          let content2 = document.createElement("textarea");
          content2.id = "content"
          document
            .getElementById("contentDiv")
            .insertAdjacentElement("beforeend", content2);
            
          content2.value = '${data1[0].content}';
          
          document
            .getElementById("contentDiv")
            .insertAdjacentElement("beforeend", brs);
            document
            .getElementById("contentDiv")
            .insertAdjacentElement("beforeend", brs);
          let user2 = document.createElement("input");
          user2.type = "number";
          user2.value = '${data1[0].user_id} ';
          user2.id = "user";
          document
            .getElementById("contentDiv")
            .insertAdjacentElement("beforeend", user2);
                    
          document
            .getElementById("contentDiv")
            .insertAdjacentElement("beforeend", brs);
          let date2 = document.createElement("input");
          date2.id = "date"
          document
            .getElementById("contentDiv")
            .insertAdjacentElement("beforeend", date2);
            date2.type = "date";
          date2.value = '${data1[0].created_dt}';
        }


        if (!document.getElementById("saveBtn")) {
          let saveBtn = document.createElement("button");
          saveBtn.innerHTML = "save";
          saveBtn.id = "saveBtn";
          saveBtn.addEventListener("click", saveFunc);

          document.getElementById("containerDiv").appendChild(saveBtn);
        }
      }
      function saveFunc() {
        let id = ${data1[0].id}
        var title = document.getElementById("title").value;
        var content = document.getElementById("content").value;
        var date = document.getElementById("date").value;
        var user = document.getElementById("user").value;
        console.log(title, content, user);
        fetch("/update", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "put",
          body: JSON.stringify({ id , title, content, date, user })
        });
        alert('amjilttai shinechillee');
        location.replace('/static/list.html')
      }
    </script>
    <script src="/static/script.js"></script>
  </body>
      </html>
      `);
      console.log(data1[0].content);
    });
    connection.end();
  });
});

app.delete("/delete", async (req, res) => {
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

app.put("/update", async (req, res) => {
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
    let sql = `UPDATE ${table} SET title='${updateReq.title}', content='${updateReq.content}' , user_id='${updateReq.user}' , created_dt = '${updateReq.date}' 
    WHERE id='${updateReq.id}' `;
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
      console.log(`updated`);
    });
    console.log(updateReq);
  });
});

app.post("/test", async (req, res) => {
  let tesReq = req.body;
  console.log(tesReq);
  res.send("success");
});
const port = 5500;

app.listen(port, (err) => {
  if (err) {
    logger.crit("app start err", err);
    return;
  }
  console.log("app started ...", port);
});
