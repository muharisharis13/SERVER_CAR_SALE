const express = require("express");
const router = express.Router();
const Controller = require("../../1.controller");


router.post("/register", Controller.ControllerAuth.registerUser);
router.post("/login",Controller.ControllerAuth.loginUser);


exports.Auth = router;