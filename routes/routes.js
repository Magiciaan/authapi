const Router = require("express");
const path = require("path");
const authController = require("./../controllers/authcontroller");
const {requireAuth} = require('./../controllers/authmiddleware')
const router = Router();

router.get("/signup", authController.signup_get);
router.post("/signup", authController.signup_post);
router.get("/login", authController.login_get);
router.post("/login", authController.login_post);
router.get("/loggedin",requireAuth, (req, res, next) => {
  res.sendFile(path.join(__dirname, "./../views/loggedin.html"))
});
router.get("/register", (req, res, next) => {
  res.redirect("/signup");
});
router.get("/logout", authController.logout_get);
module.exports = router;
