import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { useNavigate,Link } from "react-router-dom";

import { makePayment,batchchange } from "../api/api";

function Dashboard(){
    const [user,setUser]=useState({});
    const [daysleft,setDaysLeft]=useState(0);
    const [changeLocal,setChangeLocal]=useState(false);

    const Navigate=useNavigate();

    async function handleBatchChange(event){
        const value=event.target.value;
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
    
    function handleLogOut(){
        localStorage.removeItem("yogaUser");
        Navigate("/");
    }
    useEffect(()=>{
        if(Object.keys(user).length!==0){
            localStorage.setItem("yogaUser",JSON.stringify(user));
        }
    },[changeLocal]);

    useEffect(()=>{
        const userData=JSON.parse(localStorage.getItem("yogaUser"));
        setUser(userData);
        const currdate=new Date();
        var lastDay = new Date(currdate.getFullYear(), currdate.getMonth() + 1, 0);
        const val=Math.round((lastDay - currdate) / (1000 * 60 * 60 * 24))-1;
        setDaysLeft(val);
    },[]);
    
    return (
    <>
        <h1>user: {user.emailId}</h1>
        <h3>Joining Date: {user.joiningDate}</h3>
        <h3>Batch: {user.batchnum}</h3>
        <p>Want to change batch?
        <select id="batch" name="batch" value={user.batchnum} 
        onChange={handleBatchChange}>
            <option value="2">2</option>
            <option value="12">12</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </select>
        </p>
        <h3>Payment Status: {user.payment?<>Done</>:<>Pending, {daysleft} days left</>}</h3>
        
        <button onClick={handleMakePayment}>Make Payment</button>
        
        <button onClick={handleLogOut}> LOG OUT </button>
    </>
    );
}

export default Dashboard;