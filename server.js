//setting up dependencies needed for app created package-lock.json
// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
    console.log(`Now listening on port: ${PORT}`);
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });