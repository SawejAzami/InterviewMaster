import mongoose from "mongoose";

const blackListTokenSchema=new mongoose.Schema({
    token:{
        type:String,
        required:[true,"token is required to be added in backlist"]
    }
},{
    timestamps:true
})

export const tokenBlacklistModel = mongoose.model("tokenBlacklistModel",blackListTokenSchema);
