let err = (err, req, res, next) => {
  try {
    res.json({
      status: false,
      message: err.message,
    });
  } catch (error) {
    throw error;
  }
};

export default err;
