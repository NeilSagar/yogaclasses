import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { useNavigate,Link } from "react-router-dom";
import moment from "moment";

import { makePayment,batchchange } from "../api/api";
import Card from "./Card";

function Dashboard(){
    const [user,setUser]=useState({});
    const [daysleft,setDaysLeft]=useState(0);
    const [changeLocal,setChangeLocal]=useState(false);
    const [jdate,setJdate]=useState(null);
    
    const Navigate=useNavigate();
    
    async function BatchChange(value){
        const querydata={emailId:user.emailId,batchnum:user.batchnum}
        const response=await batchchange(querydata);
        if(response.status===201){
            setUser((prev)=>{
                return ({
                    ...prev,
                    batchnum:value
                });
            });
            setChangeLocal(!changeLocal);
        }
        else{
            console.log("some error occured while changing batch");
        }
    }
    async function handleMakePayment(){
    
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Payment successful!",
            showConfirmButton: false,
            timer: 1500
          });
        const response= await makePayment({emailId:user.emailId});
        if(response.status===201){
            setUser((prev)=>{
                return ({
                    ...prev,
                    payment:true
                });
            });
            setChangeLocal(!changeLocal);
        }
    }
    async function handleBatchChange(){
        const { value: batchselected } = await Swal.fire({
            title: "Select a batch",
            input: "select",
            inputOptions: {
              1:"1",
              2:"2",
              3:"3",
              4:"4"
            },
            inputPlaceholder: "Select a batch",
            showCancelButton: true,
            inputValidator: (value) => {
              return new Promise((resolve) => {
                resolve();
              });
            }
          });
        setUser((prev)=>{
            return ({
                ...prev,
                batchnum:batchselected
            });
        });
        setChangeLocal(!changeLocal);
    }
    function handleLogOut(){
        localStorage.removeItem("yogaUser");
        Navigate("/");
    }
    useEffect(()=>{
        if(Object.keys(user).length!==0){
            localStorage.setItem("yogaUser",JSON.stringify(user));
        }
    },[changeLocal]);

    function getdiff(first,second){
        return Math.round((second - first) / (1000 * 60 * 60 * 24));
    }
    
    useEffect(()=>{
        const userData=JSON.parse(localStorage.getItem("yogaUser"));
        setUser(userData);
        const currdate=new Date();
        var lastDay = new Date(currdate.getFullYear(), currdate.getMonth() + 1, 0);
        const val=getdiff(currdate,lastDay);
        setDaysLeft(val);
    },[]);
    
    return (
    <div className="dashboard">
        <div className="navbar">
            <h2>Yoga-shreni</h2>
            <p>user: {user.emailId}</p>
        </div>
        <div className="display-info">
            <Card heading="Doing Yoga for" value={getdiff(new Date(),new Date(user.joiningDate))} 
            units="days" additional={"Joined on "+moment(new Date(user.joiningDate)).format("MMMM Do YY")}></Card>
        
        <Card heading="Batch" value={user.batchnum} 
            units="" additional=""></Card>
        <Card heading="Payment Status" value={user.payment?"Done":"Pending"} 
            units="" additional={user.payment?"":daysleft+"days left"}></Card>
           
        {/* <h3>Batch: {user.batchnum}</h3> */}
        
        </div>
        <div className="buttonsec">

        {/* <p>Want to change batch?
        <select id="batch" name="batch" value={user.batchnum} 
        onChange={handleBatchChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </select>
        </p> */}
        <button className="button" onClick={handleBatchChange}>Change Batch</button>
        <button className="button" onClick={handleMakePayment}>Make Payment</button>
        </div>
        <div className="logoutsec">
        <button className="logout" onClick={handleLogOut}> LOG OUT </button>
        </div>
    </div>
    );
}

export default Dashboard;