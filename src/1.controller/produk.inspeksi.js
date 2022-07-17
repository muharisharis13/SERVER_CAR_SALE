const { produk_inspeksi } = require("../3.models");
const { responseJson } = require("../5.util");

// image_produk : `http://localhost:1234/uploads/produk/${req.file.filename}`
exports.addInspections = async (req, res) => {
  const { filename } = req.file;
  const { id_inspeksi, id_produk, status } = req.body;
  try {
    if (filename) {
      await produk_inspeksi
        .create({
          id_inspeksi,
          id_produk,
          status,
          image: `${process.env.BASE_URL}${process.env.ROUTE_VIEW_PRODUCT}/${filename}`,
        })
        .then((result) => {
          responseJson(res, result, 201);
        });
    } else {
      responseJson(res, "img_product Required", 400);
    }
  } catch (error) {
    responseJson(res, error, 500);
  }
};
