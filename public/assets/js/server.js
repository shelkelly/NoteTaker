// dependencies
var express = require("express");
var path = require("path");
var fs = require("fs");
var db = require("../db/db.json")

// set up express app
var app = express();
var PORT = process.env.PORT || 3001;

// express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTML ROUTES

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});

// API ROUTES
app.get("/api/notes", function (req, res) {
    notedb = fs.readFileSync("./Develop/db/db.json", "utf8");
    notedb = JSON.parse(notedb);
    res.json(notedb);
});

// CREATE NEW NOTE
app.post("/api/notes", function (req, res) {
    notedb = fs.readFileSync("./Develop/db/db.json", "utf8");
    notedb = JSON.parse(notedb);
    req.body.id = notedb.length;
    notedb.push(req.body);
    notedb = JSON.stringify(notedb);
    fs.writeFile("./Develop/db/db.json", notedb, "utf8");
    res.json(JSON.parse(notedb));
})

// DELETE NOTE
app.delete("/api/notes/:id", function(req, res) {
    notedb = fs.readFileSync("./Develop/db/db.json", "utf8");
    notedb = JSON.parse(notedb);
    notedb = notedb.filter(function(note) {
        return note.id != req.params.id;
    });
    notedb = JSON.stringify(notedb);
    fs.writeFile("./Develop/db/db.json", notedb, "utf8");
    res.send(JSON.parse(notedb));
})