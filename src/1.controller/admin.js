const models = require("../3.models");
const utils = require("../5.util");

const responseJson = utils.responseJson;
const produk = models.produk;

// exports.getProduct = async (req, res) => {
//   try {
//     await produk
//       .findAll()
//       .then((result) => {
//         responseJson(res, result, 200);
//       })
//       .catch((err) => {
//         responseJson(res, err.message, 400);
//       });
//   } catch (error) {
//     responseJson(res, error.parent.sqlMessage, 500);
//   }
// };
