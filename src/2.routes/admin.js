const express = require("express");
const router = express.Router();
const controller = require("../1.controller");
const utils = require("../5.util");

const checkToken = utils.token.checkTokenAdmin;
const auth = controller.ControllerAuth;
const product = controller.ControllerProduk;
const preSales = controller.ControllerPreSales;
const user = controller.ControllerUser;

router.post("/auth/login", auth.loginAdmin);
router.post("/auth/register", auth.registerAdmin);

router.get("/product", checkToken, product.getProduk);
router.post("/product", checkToken, product.addProduk);
router.put("/product/:id", checkToken, product.editProduk);
router.get("/product/:id", checkToken, product.getDetailProduk);
router.delete("/product/:id", checkToken, product.deleteProduk);

router.get("/pre-sales", checkToken, preSales.getDataListSales);
router.get("/pre-sales/:id", checkToken, preSales.getDetailPreSales);
router.put(
  "/pre-sales/update/status",
  checkToken,
  preSales.changeStatusPreSales
);

router.get("/user", checkToken, user.getUser);

router.get("/status", checkToken, preSales.getStatus);

module.exports = router;
