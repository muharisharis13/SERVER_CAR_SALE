const express = include("express");
const router = express.Router();
const Controller = include("/src/1.controller");
const utils = include("/src/5.util");

const checkToken = utils.token.checkToken;

router.post("/auth/login", Controller.ControllerAuth.loginUser);
router.post("/auth/register", Controller.ControllerAuth.registerUser);

// router.get("/", checkToken, Controller.ControllerUser.getUser);
// router.get("/detail/:id", checkToken, Controller.ControllerUser.getDetailUser);
// router.put("/edit/:id", checkToken, Controller.ControllerUser.editUser);
// router.delete("/hapus/:id", checkToken, Controller.ControllerUser.hapusUser);
// router.get("/produk", checkToken, Controller.ControllerProduk.getProduk);
// router.post("/produk/add", checkToken, Controller.ControllerProduk.addProduk);
// router.get(
//   "/produk/detail/:id",
//   checkToken,
//   Controller.ControllerProduk.getDetailProduk
// );
// router.put(
//   "/produk/edit/:id",
//   checkToken,
//   Controller.ControllerProduk.editProduk
// );
// router.delete(
//   "/produk/delete/:id",
//   checkToken,
//   Controller.ControllerProduk.deleteProduk
// );

exports.User = router;
