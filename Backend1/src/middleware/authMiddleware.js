import jwt from "jsonwebtoken"
import { tokenBlacklistModel } from "../Models/blacklistModel.js";


async function authUserMiddleware(req, res, next) {
  try {
    
    const token = req.cookies.token;
    // console.log(token)
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token not provided",
      });
    }
    const isTokenBlacklist=await tokenBlacklistModel.findOne({token})

    if(isTokenBlacklist){
        return res.status(401).json({
          success: false,
          message: "Token is invalid",
        });
    }


    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Token not provided",
    });
  }
  
}
export default authUserMiddleware;