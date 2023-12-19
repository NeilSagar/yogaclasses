import { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";

import {saveSignUpDate} from "../api/api.js";

function Signup(){
    const Navigate=useNavigate();
    // const [currdate,setCurrdate]=useState(new Date());
    const [formData,setFormData]=useState({});
    const [currdatestr,setCurrdatestr]=useState("");
    const [unknownError,setUnknownError]=useState(false);
    const [existUser,setExistUser]=useState(false);
    function handleFormChange(event){
        setUnknownError(false);

        const name=event.target.name;
        let value=event.target.value;
        if(name==="emailId"){
            setExistUser(false);
            value=value.toLowerCase();
        }
        setFormData((prevVal)=>{
            return({
                ...prevVal,
                [name]:value
            });
        });
    }
    async function handleSubmit(){
        const response=await saveSignUpDate(formData);
        if(response.status===201){
            Navigate("/Dashboard");
            localStorage.setItem("yogaUser",JSON.stringify(response.data.message));
        }else if(response.data==="Exists"){
            setExistUser(true);
        }else{
            setUnknownError(true);
        }
    }
    useEffect(()=>{
        const date=new Date();
        const year=(date.getFullYear()).toString();
        const month=(date.getMonth()).toString();
        const day=(date.getDate()).toString(); 
        const str_date=year+"-"+month+"-"+day;
        setCurrdatestr(str_date);
        setFormData((prevVal)=>{
            return({
                ...prevVal,
                "currdate":date
            });
        });
    },[]);

    return (
        <div className="Signup">
            <h1>Signup</h1>
            <input type="text" name="username" placeholder="Name?" 
            value={formData.username} onChange={handleFormChange}></input>

            <input type="number" name="age" placeholder="Age?" 
            value={formData.age} onChange={handleFormChange}></input>

            <input type="number" name="batchnum" placeholder="Batch?" 
            value={formData.batchnum} onChange={handleFormChange}></input>

            <input type="date" name="date" value={currdatestr} disabled={true}/>

            <h3>Credential</h3>
            <input type="email" name="emailId" placeholder="Email?" 
            value={formData.emailId} onChange={handleFormChange}></input>

            <input type="password" name="password" placeholder="Password?" 
            value={formData.password} onChange={handleFormChange}></input>
            
            <input type="password" name="confirmPassword" placeholder="Please re-enter your password." 
            value={formData.confirmPassword} onChange={handleFormChange}></input>

            <button onClick={handleSubmit}>Submit</button>
            {existUser?<>User with this Email Already Exists</>:<></>}
            {unknownError?<>Some Error Occured! Please try again later.</>:<></>}
            <br/>
            <Link to="/signin"> Sign In </Link>
        </div>
    );
}

export default Signup;