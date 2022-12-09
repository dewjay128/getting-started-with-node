"use strict";

const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST;
const db = require("./db");

// App
const app = express();
app.get("/", db.getSuggestions);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
