import axios from "axios";
const URL="http://localhost:5000";

export const saveSignUpDate=async(data)=>{
    try {
        const response=await axios.post(URL+"/saveSignUpDate",data);
        return response;
    } catch (error) {
        console.log("Error while saving Auth-Credentials. Error:",error.message);
        return error;
    }
}
export const signIn=async(data)=>{
    try {
        const response=await axios.post(URL+"/signin",data);
        return response;
    } catch (error) {
        console.log("Error while signing In. Error:",error.message);
        return error;
    }
}
export const makePayment=async(data)=>{
    try {
       const response =await axios.post(URL+"/makepayment",data);
        return response;
    } catch (error) {
        console.log("Error while doing payment. Error:",error.message);
        return error;
    }
}
export const batchchange=async(data)=>{
    try {
       const response =await axios.post(URL+"/batchchange",data);
        return response;
    } catch (error) {
        console.log("Error while changing batch. Error:",error.message);
        return error;
    }
}

export const getPersonDetails=async(data)=>{
    try {
       const response =await axios.post(URL+"/getPersonDetails",data);
        return response;
    } catch (error) {
        console.log("Error while getting person details. Error:",error.message);
        return error;
    }
}