const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  // If it's a Mongoose validation error, make it a 400
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: "Validation failed",
      fields: Object.keys(err.errors).map(key => ({
        field: key,
        message: err.errors[key].message
      }))
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  res.status(status).json({ error: err.message || "Internal server error" });
};

module.exports = errorHandler;
