// dependencies
const express = require("express");

// set up express app
const app = express();
const PORT = process.env.PORT || 3005;

// express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
