const { checkNotAuthenticated } = require('../middlewares/auth')
const passport = require('passport')
const express = require('express')
const router = express.Router()

router.get("/login", (req, res) => {
    res.render("login")
})

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/auth/login',
    failureFlash: true
}))

router.delete('/logout', (req, res, next) => {
    req.logout(err => {
        if (err) { return next(err); }
        res.redirect('/auth/login')
    })
})

module.exports = router