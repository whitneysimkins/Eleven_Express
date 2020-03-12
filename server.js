//setting up dependencies needed for app created package-lock.json
var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express()

var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
    console.log(`Now listening on port: ${PORT}`);
});

app.get("/", function(req, res) {
    res.json(path.join(__dirname, "public/index.html"));
  });

app.get("/", function(req, res) {
    res.json(path.join(__dirname, "public/notes.html"));
  });