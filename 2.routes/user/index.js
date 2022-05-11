const express = require("express");
const router = express.Router();
const Controller = require("../../1.controller");

router.get("/", Controller.ControllerUser.getUser);

exports.User = router;
