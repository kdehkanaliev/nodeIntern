import pool from "../configs/db.js";

const healthCheck = async (req, res, next) => {
  try {
    await pool.query("SELECT 1");

    res.status(200).json({
      status: "OK",
      server: "running",
      database: "connected",
      time: new Date(),
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      server: "running",
      database: "not connected",
      error: error.message,
    });
  }
};

export { healthCheck };
