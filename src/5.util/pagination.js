const getWithPagination = ({ models, page, limit, order_by, sort_by }) => {
  let offset = 0 + (page - 1) * limit;

  return models.findAndCountAll({
    offset: offset,
    limit: limit,
    order: [[order_by, sort_by]],
  });
};

module.exports = getWithPagination;
