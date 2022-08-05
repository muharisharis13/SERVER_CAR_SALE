const { ms_merek } = require("../3.models");
const {
  responseJson,
  getWithPagination,
  compiler: { compilerPage },
} = require("../5.util");


class classUser {
  getMsMerek = async (req, res) => {
    const {
      page = 1,
      limit = 10,
      order_by = "id",
      sort_by = "ASC",
      search = "",
    } = req.query;
    try {
      await getWithPagination({
        models: ms_merek,
        page,
        limit,
        order_by,
        sort_by,
        field: "name",
        search,
      }).then((result) => {
        responseJson(res, compilerPage(result, page, limit), 200);
      });
    } catch (error) {
      responseJson(res, error, 500);
    }
  }
}


let user = new classUser()
module.exports = {
  user
}

