import express from "express"
import {
  login,
  register,
  logout,
  getController,
} from "../Controllers/authController.js";
import authUserMiddleware from "../middleware/authMiddleware.js";

const authRouter=express.Router()

/*******
 * @route POST /api/auth/register
 * @description  Register a new username
 * @access public
 */
authRouter.post("/register",register)

/*******
 * @route POST /api/auth/login
 * @description  login user with email and password
 * @access public
 */
authRouter.post("/login", login);

/*******
 * @route GET /api/auth/logout
 * @description clear token user cookie and add token in blacklist
 * @access public
 */
authRouter.get("/logout", logout);

/*******
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access public
 */
authRouter.get("/getme", authUserMiddleware, getController);


export default authRouter