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

async function createPostFile(data){
    const allPosts = await postModel.find({})
    // Filtro de Mas Noticias. De momento se muestran las 3 primeras
    const filteredPosts = allPosts.slice(0,3)

    const fileName = `${data._id}.ejs`
    const filePath = path.join(__dirname, '../public/views/posts', fileName)

    let additionalPostsContent = ''
    if (filteredPosts.length > 2){
      filteredPosts.forEach(post => {
        additionalPostsContent += `
          <a href="/noticias/${post._id}">
            <figure class="noticia">
              <img src="../../uploads/${post.image}" alt="${post.title}" />
              <figcaption>
                <h6>${post.title}</h6>
                <p>${post.description}</p>
              </figcaption>
            </figure>
          </a>`
      })
    } 

    let content = ` <head>
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
      <div class="contenedorNoticia">
        <h2>${data.title}</h2>
        <p>${data.description}</p>
      </div>
    </section>

    <div class="noticias">
      <h4>MAS NOTICIAS</h4>
      <div class="noticias-container">
        ${additionalPostsContent}
      </div>
    </div>

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
    const { id, imageId } = req.params
    const postPath = path.join(__dirname, '../public/views/posts', `${id}.ejs`)
    const imagePath = path.join(__dirname, '../public/uploads', `${imageId}`)

    console.log(imagePath)

    try {
        const deletedPost = await postModel.findByIdAndDelete(id);
        if (!deletedPost) {
          return res.status(404).send('Post not found');
        }
        

        fs.access(postPath, fs.constants.F_OK, (err) => {
          if (err) {
            return res.status(404).json({ error: 'File not found' })
          }

          fs.access(imagePath, fs.constants.F_OK, (err) => {
            if (err) {
              return res.status(404).json({ error: 'File not found' })
            }
        
            fs.unlink(postPath, (err) => {
              if (err) {
                console.error('Error deleting file:', err)
                return res.status(500).json({ error: 'Error deleting file' })
              }
        
              fs.unlink(imagePath, (err) => {
                if (err) {
                  console.error('Error deleting file:', err)
                  return res.status(500).json({ error: 'Error deleting file' })
                }
          
                res.redirect("/admin")
              })
            })
          })
        })
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