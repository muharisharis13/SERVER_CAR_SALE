exports.compilerPage = (result, page, limit) => {
  return {
    data: result.rows,
    total_page: result.count,
    page: parseInt(page),
    limit: limit,
  };
};
