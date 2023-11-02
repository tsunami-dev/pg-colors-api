const express = require('express')
const app = express()
const colorsController = require("./controllers/colorsController.js");

const cors= require('cors')




app.use(cors())
app.use(express.json())
app.use("/colors", colorsController);


app.get('/',(req,res) => {
    res.send('Welcome to Colors App');
});

app.get("*", (req, res) => {
    res.status(404).send("Page not found");
});

module.exports = app