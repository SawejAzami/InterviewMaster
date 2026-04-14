import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
    {
        username:{
            type:String,
            unique:[true,"username  already taken"]
        },
        email:{
            type:String,
            unique:[true,"Account is already exist with this email"]
        },
        password:{
            type:String,
            required:true
        }
    }
)
export const User = mongoose.model("User", userSchema);
