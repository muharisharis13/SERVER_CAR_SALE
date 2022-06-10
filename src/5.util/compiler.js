exports.compilerPage = (result, page, limit) => {
  return {
    data: result.rows,
    total_page: Math.ceil(result.count / limit),
    page: parseInt(page),
    limit: limit,
  };
};
