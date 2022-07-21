const sequelize = require("sequelize");
const { produk_inspeksi, ms_inspeksi } = require("../3.models");
const {
  responseJson,
  path,
  fs: { deleteFile },
} = require("../5.util");
const { db } = require("../4.database");

// image_produk : `http://localhost:1234/uploads/produk/${req.file.filename}`
exports.updateInspections = async (req, res) => {
  // const { filename } = req.file;
  const { id_inspeksi, id_produk, status, filename } = req.body;
  try {
    let result;

    if (req.file) {
      result = await produk_inspeksi.findOne({
        where: {
          id_inspeksi,
          id_produk,
        },
      });

      result.update({
        status,
        image: req.file.filename,
      });
      responseJson(res, "success update inspections", 200);
    } else {
      result = await produk_inspeksi.findOne({
        where: {
          id_inspeksi,
          id_produk,
        },
      });
      result.update({
        status,
        image: null,
      });
      deleteFile(res, `${process.env.PATH_UPLOAD_PRODUCT}/${filename}`);
      responseJson(res, "success update inspections", 200);
    }
  } catch (error) {
    responseJson(res, error, 500);
  }
};

exports.getInspections = async (req, res) => {
  try {
    await produk_inspeksi.findAll().then((result) => {
      responseJson(res, result, 200);
    });
  } catch (error) {
    responseJson(res, error, 500);
  }
};
exports.getItemInspections = async (req, res) => {
  const { id_produk } = req.query;
  try {
    await db
      .query(
        `SELECT * FROM produk_inspeksi pi INNER JOIN ms_inspeksi mi ON pi.id_inspeksi=mi.id INNER JOIN ms_kategori_inspeksi ki ON mi.id_kategori=ki.id WHERE pi.id_produk=${id_produk}`,
        { type: sequelize.QueryTypes.SELECT }
      )
      .then((result) => {
        let newResult = result.map((item) => ({
          id: item.id,
          id_inspeksi: item.id_inspeksi,
          id_produk: item.id_produk,
          status_inspeksi: item.status === "1" ? true : false,
          image_inspeksi:
            item.image !== null
              ? path.pathViewImage(process.env.ROUTE_VIEW_PRODUCT, item.image)
              : null,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          nama_inspeksi: item.nama_inspeksi,
          id_kategori: item.id_kategori,
          kategori: item.kategori,
        }));
        responseJson(res, newResult, 200);
      });
  } catch (error) {
    responseJson(res, error, 500);
  }
};
