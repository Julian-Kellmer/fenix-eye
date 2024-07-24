const express = require('express')
const router = express.Router()
const { checkAuthenticated } = require('../middlewares/auth')
const postsController = require("../controllers/posts")
const multer = require("../middlewares/multer")

//! Auth
router.use(checkAuthenticated)

//* Routes
router.get('/', checkAuthenticated, postsController.getAllPosts)

router.get("/search", postsController.searchPost)

router.post("/create", multer.upload.single("image"), postsController.createPost)

router.post("/update/:id", multer.upload.single("image"), postsController.updatePost)

router.post("/delete/:id", postsController.deletePost)

module.exports = router