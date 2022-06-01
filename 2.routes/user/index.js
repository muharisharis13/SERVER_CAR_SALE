const express = require("express");
const router = express.Router();
const Controller = require("../../1.controller");
const utils = require("../../5.util")

const checkToken = utils.token.checkToken

router.get("/", checkToken ,Controller.ControllerUser.getUser);
router.get("/detail/:id", checkToken ,Controller.ControllerUser.getDetailUser);
router.put("/edit/:id", checkToken,Controller.ControllerUser.editUser);
router.delete("/hapus/:id", checkToken,Controller.ControllerUser.hapusUser);
router.get("/produk",checkToken,Controller.ControllerProduk.getProduk);
router.post("/produk/add",checkToken,Controller.ControllerProduk.addProduk);
router.get("/produk/detail/:id",checkToken,Controller.ControllerProduk.getDetailProduk);
router.put("/produk/edit/:id",checkToken,Controller.ControllerProduk.editProduk);
router.delete("/produk/delete/:id",checkToken,Controller.ControllerProduk.deleteProduk);





exports.User = router;
