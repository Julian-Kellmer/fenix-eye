const express = require('express')
const router = express.Router()
const postModel = require("../db/models/Post")
const path = require('path')
const fs = require('fs')

router.get("/", (req, res) => res.render("index"))

router.get("/noticias", async (req, res) => {
    try {
        const noticias = await postModel.find({}).sort({ createdAt: -1 })
        res.render("noticias", {
            noticias
        })
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
})

router.get('/noticias/:id', (req, res) => {
    const fileName = `${req.params.id}.ejs`;
    const filePath = path.join(__dirname, '../public/views/posts', fileName);
  
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).send('File not found');
      }
  
      res.render(`posts/${fileName}`);
    })
})

router.get("/nuestro-adn", (req, res) => res.render("nuestroAdn"))

router.get("/servicios-y-colaboraciones", (req, res) => res.render("serv-colab"))

router.get("/representacion", (req, res) => res.render("representacion"))

router.get("/contacto", (req, res) => res.render("contacto"))

module.exports = router