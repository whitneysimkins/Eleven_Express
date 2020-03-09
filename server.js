//setting up dependencies needed for app created package-lock.json
var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = process.env.PORT || 3000;
let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

//setting up routes

//returns for the html 
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// pull from db.json
app.get("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        console.log(data);
        if (err) throw err;
        const note = JSON.parse(data);
        return res.json(note);
    });
});

// add to db.json
app.post("/api/notes", function (req, res) {
    data.push(req.body);
    fs.writeFile("./db/db.json", JSON.stringify(data), function (err) {
        if (err) throw err;
        console.log("New post successful!");
    });
    return res.json(data);
});

// note to delete
app.delete("/api/notes/:id", function (req, res) {
    data = data.filter(function (data) {
        if (req.params.id === data.id) {
            return false;
        }
        return true;
    });

    fs.writeFile("./db/db.json", JSON.stringify(data), function (err) {
        if (err) throw err;
        res.end();
    });

    return res.json(data);
});

//server begin listening code: 

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

