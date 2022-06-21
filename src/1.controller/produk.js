const models = require("../3.models");
const { responseJson, getWithPagination, compiler } = require("../5.util");
const utils = require("../5.util");

// PRODUK==========================

const produk = models.produk;

exports.getProduk = async (req, res) => {
  const { page = 1, limit = 10, order_by = "id", sort_by = "ASC",search='' } = req.query;
  try {
    await getWithPagination({
      models: produk,
      page,
      limit,
      order_by,
      sort_by,
      search
    })
      .then((result) => {
        responseJson(res, compiler.compilerPage(result, page, limit), 200);
      })
      .catch((err) => responseJson(res, err.parent.sqlMessage, 400));
  } catch (error) {
    utils.responseJson(res, error.parent.sqlMessage, 500);
  }
};

exports.getDetailProduk = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await produk.findOne({ where: { id: id } });
    utils.responseJson(res, result, 200);
  } catch (error) {
    utils.responseJson(res, error, 500);
  }
};

exports.editProduk = async (req, res) => {
  const { nama_penjual, email, no_hp, merek, model } = req.body;
  const { id } = req.params;
  try {
    await produk.findOne({ where: { id: id } }).then((result) => {
      if (result?.dataValues) {
        result.update({
          nama_penjual,
          email,
          no_hp,
          model,
          merek,
        });
        utils.responseJson(res, result, 200);
      } else {
        result = {
          message: "Data Tidak Ditemukan",
        };
        utils.responseJson(res, result, 200);
      }
    });
  } catch (error) {
    utils.responseJson(res, error, 500);
  }
};

exports.addProduk = async (req, res) => {
  const { nama_penjual, no_hp, email, merek, model } = req.body;
  try {
    const data1 = await produk.create({
      nama_penjual,
      no_hp,
      email,
      merek,
      model,
    });
    utils.responseJson(res, data1, 201);
  } catch (error) {
    utils.responseJson(res, error, 500);
  }
};

exports.deleteProduk = async (req, res) => {
  const { id } = req.params;
  try {
    await produk.destroy({ where: { id: id } }).then((result) => {
      result = {
        message: "Data Produk Berhasil Di Hapus",
      };
      utils.responseJson(res, result, 200);
    });
  } catch (error) {
    utils.responseJson(res, error, 500);
  }
};
