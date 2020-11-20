let User = require('../models/user')
const { body, validationResult } = require('express-validator');
let bcrypt = require('bcryptjs');
const passport = require("passport");
require('dotenv').config()

exports.signUpGet = function (req, res) {
    res.render("signUp")
}

exports.signUpPost = [
    body('fullname', 'Full name required').trim().escape().isLength({ min: 1 }),
    body('username', "Username required").trim().escape().isLength({ min: 1 }),
    body('password', "Minimum 6 character password required").trim().escape().isLength({ min: 6 }),
    body('passwordConfirmation', "Password fields must match").custom((value, { req }) => value === req.body.password),

    (req, res, next) => {

        const errors = validationResult(req);


        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            let user = new User({
                fullname: req.body.fullname,
                username: req.body.username,
                password: hashedPassword,
                membership: false
            })

            if (!errors.isEmpty()) {
                res.render('signUp', { errors: errors.array() })
                return;
            }

            user.save()

            res.redirect('/')
        });

    }
]

exports.loginGet = function (req, res) {
    res.render('login')
}

exports.loginPost = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: '/'
})

exports.secretMembershipGet = function (req, res) {
    res.render("secretMembership", { user: req.user })
}

exports.secretMembershipPost = function (req, res) {
    if (req.body.secretPassword === process.env.CLUB_PASSWORD) {
        console.log(res.locals.currentUser)
        console.log("yes")
        let id = req.user._id
        User.findByIdAndUpdate(id, { membership: true }, function (err, validationResult) {
            if (err) {
                next(err)
            } else {
                console.log("success")
                res.redirect("/")
            }

        })
    } else {
        // passwords do not match!
        console.log("naw")
        res.redirect('/catalog/secretMembership')
    }
}
