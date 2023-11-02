// controllers/colorsController.js
const express = require("express");
const { getAllColors, getColor, createColor, deleteColor, updateColor} = require("../queries/color");
const colors = express.Router();
const { checkName, checkBoolean } = require('../validations/checkColors')

// INDEX
colors.get("/", async (req, res) => {
    const allColors = await getAllColors()
    if(allColors[0]){
        res.status(200).json(allColors)
    } else {
        res.status(500).json({ error: "server error"})
    }
})

colors.get('/:id', async (req, res) => {
    // const id = req.params.id
    const { id } = req.params
    const oneColor = await getColor(id)
    if(oneColor){
        res.status(200).json(oneColor)
    } else {
        res.status(404).json({ error: 'Not Found' })
    }
})

colors.post('/', checkName, checkBoolean, async (req, res) => {
    const body = req.body
    const color = await createColor(body)
    res.status(200).json(color)
})

colors.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deletedColor = await deleteColor(id);
    if (deletedColor.id) {
      res.status(200).json(deletedColor);
    } else {
      res.status(404).json("Color not found");
    }
  });

// PUT (update) a color
// localhost:4005/colors/:id
colors.put("/:id", checkName, checkBoolean, async (req, res) => {
    const { id } = req.params
    const body = req.body
    const updatedColor = await updateColor(id, body)
    if(updatedColor.id){
        res.status(200).json(updatedColor)
    } else {
        res.status(404).json({ error: "Color Not Found" })
    }
})

module.exports = colors