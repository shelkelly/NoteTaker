//SERVER SETUP

// dependencies
const express = require("express");

// set up Express app
const app = express();
const PORT = process.env.PORT || 3005;

// Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

require('./public/functioning.js')(app);

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
