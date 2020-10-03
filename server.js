// dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const { notStrictEqual } = require("assert");

// set up express app
const app = express();
const PORT = process.env.PORT || 3005;

// express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

//require("./public/assets/js/index.js");

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

module.exports = function (app) {
    //API GET Requests
    //When user visits a page, they will be shown the html and the data required.

    //INDEX 
    //HTML GET
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "index.html"));
    });

    //NOTES GET
    //HTML GET
    app.get("/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "notes.html"))
    });
    //RETRIEVE JSON & POST JSON
    app.get("/api/notes", function (req, res) {
        fs.readFile("./db/db.json");
        notedb = JSON.parse(data);
        res.json(notedb);
    });

    //POST NEW NOTE
    app.post("/api/notes", function (req, res) {
        var newNote = req.body;
        fs.readFile("./db/db.json");
        notedb = JSON.parse(data);
        notedb.push(newNote);
        updateDB();
    });

    //GETS ID
    app.get("/api/notes/:id", function (req, res) {
        fs.readFile("./db/db.json");
        notedb = JSON.parse(data);
        res.json(notedb[req.params.id]);
    })

    // DELETE NOTE
    app.delete("/api/notes/:id", function (req, res) {
        fs.readFile("./db/db.json");
        notedb = JSON.parse(data);
        notedb.splice(req.params.id, 1);
        updateDB();
    });

    //Update DB function to update the json when a note is added or deleted
    function updateDB() {
        fs.writeFile("./db/db.json", JSON.stringify(notedb, '\t'), err => {
            if (err) throw err;
            return true;
        });
    };

};
