import pool from "../configs/db.js";

let getAllUsers = async (req, res, next) => {
  try {
    let users = await pool.query("select * from users");
    console.log(users.rows);
    res.json(users.rows);
  } catch (error) {
    next(error);
  }
};

let registerUser = async (req, res, next) => {
  try {
    let { email, password, name, role } = req.body;
    let users = await pool.query(
      "insert into users(name,email,password,role) values($1,$2,$3,$4)",
      [name, email, password, role],
    );
    res.status(201).json({ status: true, message: "user created" });
  } catch (error) {
    next(error);
  }
};

let login = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let user = await pool.query("select * from users where email=$1", [email]);

    if (user.rows.length === 0) throw new Error("User topilmadi");
    if (user.rows[0].password !== password) throw new Error("Password Wrong");
    res.json({ status: true, message: "succesfully login" });
  } catch (error) {
    next(error);
  }
};

export { getAllUsers, registerUser, login };
