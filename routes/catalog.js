var express = require('express');
var router = express.Router();
let userController = require("../controllers/userController");

router.get('/', function(req,res,err) {
    console.log(req.user)
    res.render("index", { user: req.user });
})


router.get("/signUp", userController.signUpGet);

router.post("/signUp", userController.signUpPost);

router.get("/login", userController.loginGet)

router.post("/login", userController.loginPost)

router.get("/logOut", (req, res) => {
    req.logout();
    res.redirect("/");
  });

module.exports = router;

