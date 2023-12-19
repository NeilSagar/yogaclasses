import express from "express";


import authModel from "../schema/authschema.js";
import PersonModel from "../schema/PersonSchema.js";
import PaymentStatusModel from "../schema/PaymentSchema.js";

const router=express.Router();

router.post("/saveSignUpDate",async (req,res)=>{
    const receivedData=req.body;
    const authData={
        emailId:receivedData.emailId,
        password:receivedData.password
    }
    const personData={
        Name:receivedData.username,
        Age:receivedData.age,
        Batch:receivedData.batchnum,
        Date:receivedData.currdate,
        emailId:receivedData.emailId
    }
    const paymentData={
        emailId:receivedData.emailId,
    }

    const saveAuthData=new authModel(authData);
    const savePersonData=new PersonModel(personData);
    const savePaymentData= new PaymentStatusModel(paymentData);
    console.log(savePaymentData);
    //check if already exists
    //code

    try {
        console.log("check");
        const responseAuth=await saveAuthData.save();
        console.log("check");
        const responsePerson=await savePersonData.save();
        console.log("check");
        const responsePayment=await savePaymentData.save();
        console.log("check");
        const msg={
            emailId:authData.emailId,
            joiningDate:personData.Date,
            batchnum:personData.Batch,
            payment:false
        }
        res.status(201).json({message:msg})
    } catch (error) {
        res.status(404).json({message:error.message});
    }
});

router.post("/makepayment",async(req,res)=>{
    const dataReceived=req.body;
    const emailId=dataReceived.emailId;
    try {
        const query={emailId:emailId};
        const updated={payment_status:true};
        await PaymentStatusModel.findOneAndUpdate(query,updated);
        res.status(201).json({message:"Paid"});
    } catch (error) {
        res.status(404).json({message:error.message});
    }
});

router.post("/batchchange",async(req,res)=>{
    const dataReceived=req.body;
    // console.log(dataReceived);
    const emailId=dataReceived.emailId;
    const newbatch=dataReceived.batchnum;
    try {
        const query={emailId:emailId};
        const updated={Batch:newbatch};
        const response=await PersonModel.findOneAndUpdate(query,updated);
        console.log(response);
        res.status(201).json({message:response});
    } catch (error) {
        res.status(404).json({message:error.message});
    }
})

router.post("/signin",async(req,res)=>{
    const receivedData=req.body;
    
    try {
        const found=await authModel.find({emailId:receivedData.emailId});
        // console.log(found);
        // console.log(found);
        if(found.length===0){
            res.status(201).json({exists:false,credential:false});
        }
        else if(found[0].password===receivedData.password){
            res.status(201).json({exists:true,credential:true});
        }else{
            res.status(201).json({exists:true,credential:false});
        }
    } catch (error) {
        res.status(404).json({message:error.message});
    }
});

router.post("/getPersonDetails",async(req,res)=>{
    const receivedData=req.body;
    try {
        const persondata=await PersonModel.find({emailId:receivedData.emailId});
        const paymentdata=await PaymentStatusModel.find({emailId:receivedData.emailId});
        // console.log(paymentdata);
        let obj={
            emailId:persondata[0].emailId,
            batchnum:persondata[0].Batch,
            joiningDate:persondata[0].Date,
            payment:paymentdata[0].payment_status
        }        
        res.status(201).json(obj);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
});

export default router;