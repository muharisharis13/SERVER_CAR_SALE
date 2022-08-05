const express = require("express");
const router = express.Router();
const Controller = require("../1.controller");
const utils = require("../5.util");

const checkToken = utils.token.checkToken;

const Auth = Controller.ControllerAuth;
const Product = Controller.ControllerProduk;
const ms_type_vehicle = Controller.ControllerMsTypeVehicle;
const ms_merek = Controller.ControllerMerek;
const ms_models = Controller.ControllerMsModels;
const ms_bahan_bakar = Controller.ControllerMsBahanBakar;

router.post("/auth/login", Auth.loginUser);
router.post("/auth/register", Auth.registerUser);
router.post(
  "/pre-sales",
  checkToken,
  Controller.ControllerPreSales.addPreSales
);
router.get("/product", Product.getProductUser);
router.get("/product/:id_produk", Product.getDetailProdukUser);
router.get("/product/featured", Product.getProductFeatured);

router.get("/listYear", Product.getListYear);
router.get("/ms_type_vehicle", ms_type_vehicle.getMsJenisKendaraan);
router.get("/ms_merek", ms_merek.user.getMsMerek);
router.get("/ms_models", ms_models.user.getList);
router.get("/ms_bahan_bakar", ms_bahan_bakar.user.getList);

exports.User = router;
