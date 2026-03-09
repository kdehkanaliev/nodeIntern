import jwt from "jsonwebtoken";
import usersModel from "../models/users.model.js";

let auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let userdata = jwt.verify(token, process.env.SECRET_KEY);
    let data = await usersModel.findById(userdata.id);

    req.user = data;
    next();
  } catch (error) {
    if (error.message == "invalid signature") throw new Error("Token Xato");
  }
};

export default auth;
