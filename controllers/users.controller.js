import usersModel from "../models/users.model.js";
import jwt from "jsonwebtoken";
import { generatorAccess, generatorRefresh } from "../utils/token.util.js";

let register = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    let data = new usersModel({ username, email, password });
    await data.save();
    res.status(201).json({
      status: "succes",
      message: "succesfully created",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

let getUsers = async (req, res, next) => {
  try {
    let data = await usersModel.find();
    res.status(201).json({
      status: "succes",
      message: "succesfully collect",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

let login = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let data = await usersModel.findOne({ email });

    if (!data) throw new Error("User topilmadi");
    let check = data.checkHash(password);
    if (!check) throw new Error("password hato");

    data = data.toObject();

    let accesToken = await generatorAccess({ id: data.id, email: data.email });
    let refreshToken = await generatorRefresh({ id: data.id });

    res.cookie("refresh_token", refreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
    });
    res.status(200).json({
      status: "succes",
      message: "succesfully login",
      data: { token: accesToken, ...data },
    });
  } catch (error) {
    next(error);
  }
};

let getMe = (req, res, next) => {
  res.json({
    status: "succes",
    message: "succesfully login",
    data: req.user,
  });
};

let refresh = async (req, res, next) => {
  try {
    let token = req.cookies.refresh_token;
    if (!token) throw new Error("Tokenda hatolik bor qaytadan login qiling");
    let data = await usersModel.findById(
      jwt.verify(token, process.env.REFRESH_SECRET_KEY).id,
    );
    if (!data) throw new Error("User topilmadi");
    let accesToken = await generatorAccess({ id: data.id, email: data.email });
    res.json({
      status: "succes",
      message: "succesfully login",
      data: { token: accesToken, ...data.toObject() },
    });
  } catch (error) {
    next(error);
  }
};

let logOut = (req, res) => {
  res.clearCookie("refresh_token", {
    httpOnly: true,
    secure: false,
  });

  res.status(200).json({
    status: "success",
    message: "Successfully logged out",
  });
};

export { register, getUsers, login, getMe, refresh, logOut };
