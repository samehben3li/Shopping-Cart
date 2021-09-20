const passport = require("passport")
const localStrategy = require("passport-local").Strategy
const User = require("../models/User")

passport.use("local-signin", new localStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
        if (err){
            return done(err,false)
        }
        if (! user){
            return done(null,false,req.flash("signinError","this user not found"))
        }
        if (! user.comparePassword(password)){
            return done(null,false,req.flash("signinError","wrong password"))
        }
        return done(null,user)
    })
}))