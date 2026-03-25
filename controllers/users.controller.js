import pool from "../configs/db.js";
import { generatorAccess, generatorRefresh } from "../utils/token.util.js";
import bcrypt from "bcryptjs";

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
    const hashedPassword = await bcrypt.hash(password, 10);
    let users = await pool.query(
      "insert into users(name,email,password,role) values($1,$2,$3,$4)",
      [name, email, hashedPassword, role],
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
    let check = await bcrypt.compare(password, user.rows[0].password);
    console.log(check);
    if (!check) throw new Error("Password Wrong");

    let accesToken = await generatorAccess({
      id: user.rows.id,
      email: user.rows.email,
    });
    let refreshToken = await generatorRefresh({ id: user.rows.id });

    res.cookie("refresh_token", refreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
    });

    res.cookie("access_token", accesToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
    });
    res.json({ status: true, message: "succesfully login" });
  } catch (error) {
    next(error);
  }
};

export { getAllUsers, registerUser, login };
