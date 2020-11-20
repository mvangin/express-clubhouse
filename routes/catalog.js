var express = require('express');
var router = express.Router();
let userController = require("../controllers/userController");
let messageController = require("../controllers/messageController");
let Message = require("../models/message");
const { NotExtended } = require('http-errors');


router.get("/", function (req, res, next) {
  Message.find({})
    .populate("user")
    .exec(function (err, messages) {
      res.render("index", { user: req.user, messages: messages });
    });
});

router.get("/signUp", userController.signUpGet);

router.post("/signUp", userController.signUpPost);

router.get("/login", userController.loginGet)

router.post("/login", userController.loginPost)

router.get("/logOut", (req, res) => {
    req.logout();
    res.redirect("/");
  });

router.get("/secretMembership", userController.secretMembershipGet)

router.post("/secretMembership", userController.secretMembershipPost)

router.get("/createMessage", messageController.createMessageGet)

router.post("/createMessage", messageController.createMessagePost)

module.exports = router;

