const models = require("../3.models");
const {
  responseJson,
  getWithPagination,
  compiler: { compilerPage },
} = require("../5.util");
const utils = require("../5.util");
const { Op } = require("sequelize");
const { db } = require("../4.database");

// PRODUK==========================

const produk = models.produk;
const produkImage = models.produk_image;
const path = utils.path.pathViewImage;

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
    const result = await db.query(
      `select *,group_concat(image_produk) as image_produk from  products pr inner join produk_image pi   on pr.id=pi.id_produk where pr.id=${id}`
    );

    const image_produk =
      result[0][0].image_produk !== null
        ? result[0][0].image_produk
            .split(",")
            .map((item) => `${path(process.env.ROUTE_VIEW_PRODUCT, item)}`)
        : [];
    let newResult = {
      ...result[0][0],
      image_produk: image_produk,
    };
    utils.responseJson(res, newResult, 200);
  } catch (error) {
    utils.responseJson(res, error, 500);
  }
};

exports.editProduk = async (req, res) => {
  const {
    merek,
    model,
    jenis_kendaraan,
    bahan_bakar,
    tampil,
    tahun,
    harga,
    status,
  } = req.body;
  const { id } = req.params;
  try {
    await produk.findOne({ where: { id: id } }).then((result) => {
      if (result?.dataValues) {
        result.update({
          model,
          merek,
          jenis_kendaraan,
          bahan_bakar,
          tampil,
          tahun,
          harga,
          status,
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
  const {
    merek,
    model,
    jenis_kendaraan,
    bahan_bakar,
    tahun,
    tampil,
    harga,
    status,
    id_pre_sale,
  } = req.body;
  const { img_produk } = req.files;
  try {
    if (!img_produk) {
      utils.responseJson(res, "img_produk required !", 400);
    } else {
      await produk
        .create({
          merek,
          model,
          jenis_kendaraan,
          bahan_bakar,
          tahun,
          tampil,
          harga,
          status,
        })
        .then(async (result) => {
          if (result.id) {
            const preSales = await models.preSales.findOne({
              where: {
                id: id_pre_sale,
              },
            });

            if (preSales?.id) {
              preSales.update({
                status: "DONE",
              });
            }

            img_produk.map(async (item) => {
              await produkImage.create({
                id_produk: result.id,
                image_produk: item.filename,
              });
            });
            await models.ms_inspeksi.findAll().then((resultInspeksi) => {
              resultInspeksi?.map(async (item) => {
                await models.produk_inspeksi.create({
                  id_inspeksi: item.id,
                  id_produk: result.id,
                  status: "1",
                });
              });
            });
            utils.responseJson(res, result, 201);
          } else {
            utils.responseJson(res, "Failed Add Request", 400);
          }
        });
    }
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
