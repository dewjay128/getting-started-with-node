"use strict";

const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST;
const getSuggestions = require("./server.js");

// App
const app = express();
app.get("/", (req, res) => {
  const searchTerm = req.query.search;
  const results = getSuggestions(searchTerm);

  response.status(200).json(results);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
