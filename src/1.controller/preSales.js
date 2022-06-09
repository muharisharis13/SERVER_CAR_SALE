const { preSales, user } = require("../3.models");
const { responseJson, getWithPagination, compiler } = require("../5.util");

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
        responseJson(res, resultPresales, 201);
      })
      .catch((err) => responseJson(res, err.parent.sqlMessage, 400));
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
