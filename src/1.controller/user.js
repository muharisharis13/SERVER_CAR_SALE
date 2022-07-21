const { Op } = require("sequelize");
const models = require("../3.models");
const utils = require("../5.util");

exports.getUser = async (req, res) => {
  try {
    const { search = "" } = req.query;
    const result = await models.user.findAll({
      where: {
        name: { [Op.like]: `%${search}%` },
        role: "user",
      },
    });
    utils.responseJson(res, result, 200);
  } catch (error) {
    utils.responseJson(res, error, 500);
  }
};

exports.getDetailUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await models.user.findOne({ where: { id: id } });
    utils.responseJson(res, result, 200);
  } catch (error) {
    utils.responseJson(res, error, 500);
  }
};

exports.editUser = async (req, res) => {
  const { email, tel, name } = req.body;
  try {
    await models.user
      .findOne({ where: { email: email, id: req.params.id } })
      .then((result) => {
        if (result?.dataValues) {
          result.update({
            tel,
            name,
          });
          utils.responseJson(res, result, 200);
        } else {
          result = { message: "Data Tidak Ditemukan" };
          utils.responseJson(res, result, 200);
        }
      });
  } catch (error) {
    utils.responseJson(res, error, 500);
  }
};

exports.hapusUser = async (req, res) => {
  const { id } = req.params;
  try {
    await models.user.destroy({ where: { id: id } }).then((result) => {
      result = {
        message: "Data Berhasil Di Hapus",
      };
      utils.responseJson(res, result, 200);
    });
  } catch (error) {
    utils.responseJson(res, error, 500);
  }
};
