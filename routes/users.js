const express = require('express');
const router = express.Router()
const { check, validationResult } = require("express-validator")
const User = require("../models/User")
const passport = require("passport")

/* GET users listing. */
router.get('/signup', function (req, res, next) {
  var messagesError = req.flash("error")
  res.render("user/signup", { title: "Shopping-cart", messages: messagesError })
})

router.post("/signup", [
  check("email").not().isEmpty().withMessage("plaise enter your email"),
  check("email").isEmail().withMessage("plaise enter valide email"),
  check("password").not().isEmpty().withMessage("plaise enter your password"),
  check("password").isLength({ min: 5 }).withMessage("plaise enter password more than 5 char"),
  check("confirm-password").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("password and confirm-password not matched")
    }
    return true
  })
], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {

    var validationMessages = []
    for (let i = 0; i < errors.errors.length; i++) {
      validationMessages.push(errors.errors[i].msg)
    }
    req.flash("error", validationMessages)
    res.redirect("signup")
  }
  const user = new User({
    email: req.body.email,
    password: new User().hashPassword(req.body.password)
  })
  User.findOne({ email: req.body.email }, (err, result) => {
    if (result) {
      req.flash("error", "this email already exist")
      res.redirect("signup")
    } else {
      user.save((erro, usr) => {
        console.log(erro)
        res.send(usr)
      })
    }
  })
})

router.get("/signin", (req, res) => {
  var messagesError = req.flash("signinError")
  res.render("user/signin", { title: "Shopping-cart", messages: messagesError })
})

router.get("/profile", (req, res, next) => {
  res.render("user/profile")
})

router.post("/signin", [
  check("email").not().isEmpty().withMessage("plaise enter your email"),
  check("email").isEmail().withMessage("plaise enter valide email"),
  check("password").not().isEmpty().withMessage("plaise enter your password"),
  check("password").isLength({ min: 5 }).withMessage("plaise enter password more than 5 char")
], (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    var messagesError = []
    for (let i = 0; i < errors.errors.length; i++) {
      messagesError.push(errors.errors[i].msg)
    }
    req.flash("signinError", messagesError)
    res.redirect("signin")
    return
  }
  next()
}, passport.authenticate("local-signin", {
  successRedirect: "profile",
  failureRedirect: "signin",
  failureFlash: true
}))

module.exports = router;
