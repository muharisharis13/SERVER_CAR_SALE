const models = require("../3.models");
const {
  responseJson,
  compiler: { compilerPage },
} = require("../5.util");

const db = models.ms_bahan_bakar;

class classUser {
  getList = async (req, res) => {
    const {
      page = 1,
      limit = 10,
      order_by = "id",
      sort_by = "ASC",
    } = req.query;
    let offset = 0 + (parseInt(page) - 1) * parseInt(limit);

    try {
      await db
        .findAndCountAll({
          offset: offset,
          limit,
          order: [[order_by, sort_by]],
        })
        .then((result) => {
          responseJson(res, compilerPage(result, page, limit), 200);
        })
        .catch((err) => {
          responseJson(res, err, 400);
        });
    } catch (error) {
      responseJson(res, error, 500);
    }
  };
}

let user = new classUser();

module.exports = {
  user,
};
