const { preSales, user } = require("../3.models");
const { responseJson, getWithPagination, compiler, nodemailer } = require("../5.util");


// exports.sendMail = (req, res) => {
//   const { merek, model, name, tel, email, id_user } = req.body;

// }

exports.addPreSales = async (req, res) => {
  const { merek, model, name, tel, email, id_user } = req.body;

  try {
    await preSales
      .create({
        merek,
        model,
        name,
        tel,
        email,
        id_user,
      })
      .then((resultPresales) => {
        if (resultPresales) {

          nodemailer.sendSalesMail({ merek, model, name, tel, email })
          responseJson(res, resultPresales.dataValues, 201);

        }
      })
      .catch((err) => {
        console.log("ini error", err)
        responseJson(res, err.message, 400)
      });
  } catch (error) {
    responseJson(res, error.message, 500);
  }
};

exports.getDataListSales = async (req, res) => {
  const { page = 1, limit = 10, order_by = "id", sort_by = "ASC" } = req.query;

  try {
    await getWithPagination({
      models: preSales,
      page,
      limit,
      order_by,
      sort_by,
    })
      .then((result) => {
        responseJson(res, compiler.compilerPage(result, page, limit), 200);
      })
      .catch((err) => responseJson(res, err.parent.sqlMessage, 400));
  } catch (error) {
    responseJson(res, error.message, 500);
  }
};

exports.changeStatusPreSales = async (req, res) => {
  const { status } = req.body
  const { id } = req.query
  try {
    await preSales.findOne({ where: { id: id } }).then((result) => {
      if (result?.dataValues) {
        result.update({
          status
        });
        responseJson(res, result, 200);
      } else {
        result = {
          message: "Data Tidak Ditemukan",
        };
        responseJson(res, result, 200)
      }
    })
      .catch((err) => responseJson(res, err.parent.sqlMessage, 400));

  } catch (error) {
    responseJson(res, error.message, 500);
  }
}

exports.getDetailPreSales = async (req, res) => {
  const { id } = req.params;

  try {
    await preSales.findOne({ where: { id: id } }).then((result) => {
      if (result?.dataValues) {
        responseJson(res, result, 200)
      } else {
        result = {
          message: "Data Tidak Ditemukan"
        }
        responseJson(res, result, 200);
      }
    }).catch((err) => responseJson(res, err.parent.sqlMessage, 400));
  } catch (error) {
    responseJson(res, error.message, 500)
  }
}
