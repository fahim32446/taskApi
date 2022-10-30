import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = async (req, res, next) => {

  const token = req.headers.token;


  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};



export const verifyEditor = (req, res, next) => {

  const token = req.headers.token;


  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    if (req.user.isEditor || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "Editor not allowed to do this!"));
    }
  });
};




export const verifyAdmin = async (req, res, next) => {

  const token = req.headers.token;


  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;

    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not Admin!"));
    }
  });

};