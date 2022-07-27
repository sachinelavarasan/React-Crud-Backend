
const express = require("express");
const router = express.Router();
const controller = require("./controller");
const auth = require("../security/verify");


/* GET home page. */
router.get("/tasks/:userid", controller.getAllTask );
router.post("/tasks", controller.newTask );
 router.patch("/tasks/:taskid", controller.updateTask );
router.get("/tasks/one/:taskid",controller.getTask );
router.delete("/tasks/:taskid", controller.deleteTask );


module.exports = router;
