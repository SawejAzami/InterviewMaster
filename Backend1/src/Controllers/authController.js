
import { User } from "../Models/userModels.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { tokenBlacklistModel } from "../Models/blacklistModel.js";



/*******
 * @name login
 * @description  login a user
 * @access public
 */
const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        if( !email || !password){
            return res.status(400).json({
                success:false,
                message:"Please provide all data"
            })
        }

        const user=await User.findOne({
            email
        })

        if(!user){
             return res.status(400).json({
               success: false,
               message: "Invalid email or password",
             });
        }

        const isPasswordValid=bcrypt.compare(password,user.password)
        if (!isPasswordValid) {
          return res.status(400).json({
            success: false,
            message: "Invalid email or password",
          });
        }
        
        const token = jwt.sign(
          { id: user._id, user: user.username },
          process.env.JWT_SECRET,
          { expiresIn: "1d" },
        );

        res.cookie("token",token)

        return res.status(200).json({
          success: true,
          message: "user logedIn successfully",
          user:{
            id:user._id,
            username:user.username,
            email:user.email
          }
        });

    } catch (error) {
        console.log(error);
         return res.status(400).json({
           success: false,
           message: "user login fail....",
         });
    }
}



/*******
 * @name register
 * @description  Register a new user
 * @access public
 */
const register=async(req,res)=>{
    try {
        const {username,email,password}=req.body
        console.log(email)
        if(!username || !email || !password){
            return res.status(400).json({
                success:false,
                message:"Please provide all data"
            })
        }
        const isUserExist=await User.findOne({
            $or:[{username},{email}]
        })
        if(isUserExist){
             return res.status(400).json({
               success: false,
               message: "Account is already exist",
             });
        }

        const hash=await bcrypt.hash(password,10);
        const user=await User.create({
            username,
            email,
            password:hash
        })
        const token=jwt.sign(
            {id:user._id,user:user.username},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )

        res.cookie("token",token)
        return res.status(201).json({
          success: true,
          message: "user registerd",
          user:{
            id:user._id,
            username:user.username,
            email:user.email
          }
        });

    } catch (error) {
        console.log(error)
         return res.status(400).json({
           success: false,
           message: "user registration fail....",
         });
    }
}


/*******
 * @name logout
 * @description  logout a user
 * @access public
 */
const logout = async (req, res) => {
  try {
    const token=req.cookies.token

    if(token){
      await tokenBlacklistModel.create({token})
    }
    res.clearCookie("token")
    return res.status(200).json({
      success:true,
      message:"User Logged out successfully"
    })
    
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "user logout fail....",
    });
  }
};

/*******
 * @route getController
 * @description get the current logged in user details
 * @access public
 */
async function getController(req,res){
  const user =await User.findById(req.user.id)
  return res.status(200).json({
    success: true,
    message: "user details....",
    user:{
      id:user._id,
      username:user.username,
      email:user.email
    }

  });
}

export { register, login, logout, getController };