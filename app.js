const express = require("express")
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const passport = require("passport")
const flash = require("express-flash")
const session = require("express-session")
const methodOverride = require("method-override")
const bcrypt = require('bcrypt')
const db = require("./db/connect")
const app = express()
db()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(flash())
app.use(session({
    secret: '123456',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride("_method"))

const authRouter = require('./router/auth')
const adminRouter = require('./router/admin')
const mainRouter = require('./router/main')
const newsRouter = require('./router/news')

app.use("/", mainRouter)
app.use("/admin", adminRouter)
app.use("/auth", authRouter)
app.use("/noticias", newsRouter)

const users = [];
const user = {
    id: Date.now().toString(),
    name: "Fenixx Eye",
    email: "a",
    password: ""
};

async function hashPass() {
    const pass = await bcrypt.hash("a", 10)
    user.password = pass
    users.push(user)
    return pass
}
hashPass()

const initializePassport = require("./passport-config");
initializePassport(passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

app.listen(3000, () => {
    console.log("Server on Port 3000")
})