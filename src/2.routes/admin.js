const express = require("express");
const router = express.Router();
const controller = require("../1.controller");
const utils = require("../5.util");

const checkToken = utils.token.checkTokenAdmin;
const uploadImageProduct = utils.multer.uploadProductImg;
const auth = controller.ControllerAuth;
const product = controller.ControllerProduk;
const preSales = controller.ControllerPreSales;
const user = controller.ControllerUser;
const productInspections = controller.ControllerProductInspections;

router.post("/auth/login", auth.loginAdmin);
router.post("/auth/register", auth.registerAdmin);

router.get("/product", checkToken, product.getProduk);
router.post("/product", checkToken, product.addProduk);
router.put("/product/:id", checkToken, product.editProduk);
router.get("/product/:id", checkToken, product.getDetailProduk);
router.delete("/product/:id", checkToken, product.deleteProduk);

router.post(
  "/inspections",
  checkToken,
  uploadImageProduct.single("img_product"),
  productInspections.addInspections
);
router.get("/inspections",checkToken,productInspections.getInspections);
router.get("/inspections-items", checkToken, productInspections.getItemInspections)

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
