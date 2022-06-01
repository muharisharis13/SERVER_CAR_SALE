const express = require("express");
const router = express.Router();
const Controller = require("../../1.controller");
const utils = require("../../5.util")

const checkToken = utils.token.checkToken

router.get("/", checkToken ,Controller.ControllerUser.getUser);
router.put("/edit/:id", checkToken,Controller.ControllerUser.editUser);
router.delete("/hapus/:id", checkToken,Controller.ControllerUser.hapusUser);






exports.User = router;
