const express = require('express')
const router = express.Router()
const postModel = require("../db/models/Post")

router.get("/", (req, res) => res.render("index"))

router.get("/noticias", async (req, res) => {
    try {
        const posts = await postModel.find({})
        console.log(posts)
        res.render("noticias", {
            posts
        })
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
})

router.get("/nuestro-adn", (req, res) => res.render("nuestroAdn"))

router.get("/servicios-y-colaboraciones", (req, res) => res.render("serv-colab"))

router.get("/representacion", (req, res) => res.render("representacion"))

router.get("/contacto", (req, res) => res.render("contacto"))

module.exports = router