"use strict";
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST;
const db = require("./db");

// App
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.get("/", db.getSuggestions);
app.get("/users", db.getUsers);
app.post("/users", db.createUser);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
