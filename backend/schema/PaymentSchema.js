import mongoose from "mongoose";

const PaymentSchema=mongoose.Schema({
    emailId:{
        type:String,
        unique:true
    },
    payment_status:{
        type:Boolean,
        default:false
    }
});

const PaymentStatusModel=mongoose.model("payment",PaymentSchema);

export default PaymentStatusModel;