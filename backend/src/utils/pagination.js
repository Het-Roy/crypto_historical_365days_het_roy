const getPaginationParams = (query) => {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(100, Number(query.limit) || 20);
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

const getPaginationResponse = (data, total, page, limit) => {
  return {
    data,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

module.exports = {
  getPaginationParams,
  getPaginationResponse,
};
