import mongoose from "mongoose";

const authSchema=mongoose.Schema({
    emailId:{
        type:String,
        unique:true
    },
    password:String
});

const authModel=mongoose.model("authCredential",authSchema);

export default authModel;