var noteData = require("../db/db.json");
console.log(noteData);

module.exports = function (app) {
    // GET EXISTING NOTES
    app.get("/api/notes", function (req, res) {
       var log = res.json(noteData);
       console.log(log);
    });

    //POST NEW NOTE
    app.post("/api/notes", function (req, res) {
        var newNote = req.body;
        noteData.push(newNote);
        updateDB();
    });

    //GETS ID
    app.get("/api/notes/:id", function (req, res) {
        res.json(noteData[req.params.id]);
    })

    // DELETE NOTE
    app.delete("/api/notes/:id", function (req, res) {
        noteData.splice(req.params.id, 1);
        updateDB();
    });

    //Update DB function to update the json when a note is added or deleted
    function updateDB() {
        fs.writeFile("./db/db.json", JSON.stringify(noteData, '\t'), err => {
            if (err) throw err;
            return true;
        });
    };

};