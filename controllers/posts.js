const postModel = require("../db/models/Post")
const fs = require('fs');
const path = require('path');

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

function createPostFile(data){
    const fileName = `${data._id}.ejs`
    const filePath = path.join(__dirname, '../public/views/posts', fileName)
    const content = ` <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fenixx Eye | ${data.title}</title>
    <link rel="stylesheet" href="../css/main.css" />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    </head>
    <html>
    <body class="body">
        <%- include('../components/nav.ejs') %>
            <section class="hero-noticias">
      <img src="../../uploads/${data.image}" alt="fondo_main" />

      <div class="contenedor-noticia-info-jamie " >
        <h2>${data.title}</h2>
        <p>
          ${data.description}
        </p>
      </div>
    </section>

    <%- include('../components/footer.ejs') %>

    <script src="../scripts/script.js"></script>
    <script src="../scripts/form.js"></script>
    </body>
    </html>`  

    fs.writeFile(filePath, content, (err) => {
      if (err) {
        console.error('Error writing file:', err)
      }
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
    })
  
    newPost.save()

    createPostFile(newPost)

    res.redirect("/admin")
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