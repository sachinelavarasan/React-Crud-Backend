const express = require("express");
const router = express.Router();
const controller = require("./controller");

/* GET home page. */

router.post("/signup", controller.newUser);
router.post("/login", controller.loginUser);
router.get("/logout", controller.logoutUser);

module.exports = router;
