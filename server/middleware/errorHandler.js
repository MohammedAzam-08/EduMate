const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  // Log stack trace or message
  console.error('Error:', err.stack || err.message);

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export default errorHandler;
