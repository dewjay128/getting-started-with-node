"use strict";
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST;
const db = require("./db");

// App
const app = express();
app.set("trust proxy", true);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.head("/", (req, res) => {
  return res.sendStatus(200);
});
app.get("/", db.getSuggestions);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
