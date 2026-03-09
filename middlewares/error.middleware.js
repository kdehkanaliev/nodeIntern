let handler = (err, req, res, next) => {
  try {
    console.log(err.stack);
    res.status(401).json({
      succes: "failed",
      message: err.message,
    });
    next();
  } catch (error) {
    next(err);
  }
};

export default handler;
