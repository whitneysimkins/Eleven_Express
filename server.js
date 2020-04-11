//setting up dependencies needed for app created package-lock.json
// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var notes = require("./db/db.json");
var nextNoteId = 1;

// Sets up the Express App
// =============================================================
var app = express();

app.use(express.static("public"));
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

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

// Displays all notes
app.get("/api/notes", function(req, res) {
  return res.json(notes);
});

// Create New notes - takes in JSON input
app.post("/api/notes", function(req, res) {

  const note = req.body;

  note.id = nextNoteId;

  notes.push(note);

  nextNoteId ++;

  res.json(note);
});


// Displays a single note, or returns false
app.delete("/api/notes/:id", function(req, res) {
  var chosenId = req.params.id;

  var newNotes = [];

  for (var i = 0; i < notes.length; i++) {
    var thisNote = notes[i];
    if (chosenId != thisNote.id) {
      newNotes.push(thisNote);
    }
  }

  notes = newNotes;

  return res.json(notes);
});