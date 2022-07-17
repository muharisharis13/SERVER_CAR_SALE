const models = require("../3.models");
const {
  responseJson,
  getWithPagination,
  compiler: { compilerPage },
} = require("../5.util");
const utils = require("../5.util");
const saveFile = require('../5.util');
const { Op } = require("sequelize");

// PRODUK==========================

const produk = models.produk;

exports.getListYear = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    await produk
      .findAndCountAll({
        offset: 0 + (page - 1) * limit,
        limit: limit,
        attributes: ["tahun"],
      })
      .then((result) => {
        result.rows = [...new Set(result.rows?.map((item) => item?.tahun))];
        responseJson(res, compilerPage(result, page, limit), 200);
      });
  } catch (error) {
    responseJson(res, error, 500);
  }
};

exports.getProductUser = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    order_by = "id",
    sort_by = "ASC",
    model = "",
    merek = "",
  } = req.query;
  try {
    await produk
      .findAndCountAll({
        offset: 0 + (page - 1) * limit,
        limit: limit,
        order: [[order_by, sort_by]],
        where: {
          [Op.or]: [
            {
              model: {
                [Op.like]: `%${model}%`,
              },
              merek: {
                [Op.like]: `%${merek}%`,
              },
            },
          ],
        },
      })
      .then((result) => {
        responseJson(res, compilerPage(result, page, limit), 200);
      });
  } catch (error) {
    responseJson(res, error, 500);
  }
};

exports.getProductFeatured = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    order_by = "id",
    sort_by = "ASC",
    search = "",
  } = req.query;
  try {
    await getWithPagination({
      models: produk,
      page,
      limit,
      order_by,
      sort_by,
      field: "merek",
      search,
    }).then((result) => {
      responseJson(res, compilerPage(result, page, limit), 200);
    });
  } catch (error) {
    responseJson(res, error, 500);
  }
};

exports.getProduk = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    order_by = "id",
    sort_by = "ASC",
    search = "",
  } = req.query;
  try {
    await getWithPagination({
      models: produk,
      page,
      limit,
      order_by,
      sort_by,
      search,
      field: "merek",
    }).then((result) => {
      responseJson(res, compilerPage(result, page, limit), 200);
    });
    // .catch((err) => responseJson(res, err.parent.sqlMessage, 400));
  } catch (error) {
    utils.responseJson(res, error, 500);
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
  console.log(req.file)
  // const { nama_penjual, no_hp, email, merek, model, jenis_kendaraan, bahan_bakar, tahun, tampil,harga, status,img_produk="" } = req.body;
  // try {
  //   if(req.file){
  //     console.log(req.file)
  //   }
  //   const data1 = await produk.create({
  //     nama_penjual,
  //     no_hp,
  //     email,
  //     merek,
  //     model,
  //     jenis_kendaraan,
  //     bahan_bakar,
  //     tahun,
  //     tampil,
  //     harga,
  //     status,
  //     img_produk
  //   });
  //   utils.responseJson(res, data1, 201);
  // } catch (error) {
  //   utils.responseJson(res, error, 500);
  // }
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
