import mongoose from "mongoose";

const PersonSchema=mongoose.Schema({
    Name:String,
    Age:Number,
    Batch:Number,
    Date:Date,
    emailId:{
        type:String,
        unique:true
    }
});

const PersonModel=mongoose.model("person",PersonSchema);

export default PersonModel;