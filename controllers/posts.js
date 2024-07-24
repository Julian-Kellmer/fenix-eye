const postModel = require("../db/models/Post")

const getAllPosts = async (req, res) => {
    try {
        const posts = await postModel.find({})
        res.render("admin", {
            posts
        });
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
}

const searchPost = async (req, res) => {
  const { title } = req.query

  const result = await postModel.find({
    title: new RegExp(title, "i")
  })

  res.render("admin", {
    posts: [],
    result
  })
}

const createPost = async (req, res) => {
    const { title, category, description } = req.body;
    const imagePath = req.file.filename;
  
    const newPost = new postModel({
      title,
      category,
      image: imagePath,
      description
    });
  
    newPost.save()

    res.send("ok")
}

const updatePost = async (req, res) => {
    const { id } = req.params
    const { title, category, description } = req.body
    const imagePath = req.file ? req.file.filename : null
  
    const updateData = {
      title,
      category,
      description
    }
  
    if (imagePath) {
      updateData.image = imagePath
    }
  
    try {
      const updatedPost = await postModel.findByIdAndUpdate(id, updateData, { new: true })
      if (!updatedPost) {
        return res.status(404).send('Post not found')
      }
      res.redirect("/admin")
    } catch (err) {
      res.status(500).send(err)
    }
}

const deletePost = async (req, res) => {
    const { id } = req.params
    try {
        const deletedPost = await postModel.findByIdAndDelete(id);
        if (!deletedPost) {
          return res.status(404).send('Post not found');
        }
        res.redirect("/admin")
      } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = {
    getAllPosts,
    updatePost,
    createPost,
    deletePost,
    searchPost
}