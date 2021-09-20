const express = require('express');
const router = express.Router()
const { check, validationResult } = require("express-validator")
const User = require("../models/User")

/* GET users listing. */
router.get('/signup', function (req, res, next) {
  res.render("user/signup", { title: "Shopping-cart" })
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
    console.log(errors)
    return
  }
  const user = new User({
    email: req.body.email,
    password: new User().hashPassword(req.body.password)
  })
  User.findOne({ email: req.body.email }, (err, result) => {
    if (result) {
      console.log("email already exist")
      return
    }
    user.save((err, usr) => {
      console.log(err ? err : usr)
      res.send(usr)
    })
  })
})

module.exports = router;
