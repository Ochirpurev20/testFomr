const express = require("express");
const mysql = require("mysql");
const path = require("path");

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
    "INSERT INTO uussenTable (name,address) VALUES ('anduud llc', 'chingeltei 5r HOROO')";
  con.query(sql, (err, result) => {
    if (err) throw err;
    //res.send(result);
    // console.log(`result is :  ${result}`);
    console.log(`amjilttai bhaa`);
  });
});
