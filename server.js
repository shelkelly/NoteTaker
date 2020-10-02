// dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// CREATES REUSABLE VARIABLE FOR db.json CONTENTS
fs.readFile("db/db.json", (err, data) => {
    if (err) throw err;
    notedb = JSON.parse(data);
    console.log(notedb);



    // set up express app
    const app = express();
    const PORT = process.env.PORT || 3005;
    app.use(express.static(__dirname));

    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });

    // express app to handle data parsing
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static(__dirname));

    // HTML ROUTES

    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "index.html"));
    });

    app.get("/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "notes.html"));
    });

    // API ROUTES
    app.get("/api/notes", function (req, res) {
        res.json(notedb);
    });

    // CREATE NEW NOTE
    app.post("/api/notes/:id", function (req, res) {
        req.body.id = notedb.length;
        notedb.push(req.body);
        notedb = JSON.stringify(notedb);
        fs.writeFile("db/db.json", notedb);
        res.json(JSON.parse(notedb));
    });

    // DELETE NOTE
    app.delete("/api/notes/:id", function (req, res) {
        notedb = fs.readFileSync("db/db.json");
        notedb = JSON.parse(notedb);
        notedb = notedb.filter(function (note) {
            return note.id != req.params.id;
        });
        notedb = JSON.stringify(notedb);
        fs.writeFile("db/db.json", notedb);
        res.send(JSON.parse(notedb));
    });

});

