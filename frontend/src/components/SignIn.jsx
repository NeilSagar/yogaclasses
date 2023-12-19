import { useEffect, useState } from "react";
import {useNavigate,Link} from "react-router-dom";
import Dashboard from "./Dashboard";
import { signIn,getPersonDetails } from "../api/api";

function SignIn(){
    const [userCred,setUserCred]=useState({
        emailId:"",
        password:""
    });
    const [validated,setValidated]=useState(false);
    const [localstroageData,setLocalStorageData]=useState({});
    const [errormsg,setErrormsg]=useState("");
    
    const Navigate=useNavigate();
    async function handleSignIn(){
        const response=await signIn(userCred);
        if(response.status===404){
            setErrormsg("Some Error occured on our side. Please try again later.");
            console.log(response);
        }else{
            const responsedata=response.data;
            if(!responsedata.exists){
                setErrormsg("User does not exist. Please Sign up.");
            }else if(!responsedata.credential){
                setErrormsg("Wrong Password!")
            }else{
                setValidated(true);
            }
        }
    }
    function handleChange(event){
        setErrormsg("");
        const name=event.target.name;
        const value=event.target.value;
        setUserCred((prev)=>{
            return ({
                ...prev,
                [name]:value
            });
        });
    }
    async function fetchdetails(){
        const data={
            emailId:userCred.emailId
        }
        const response=await getPersonDetails(data);
        if(response.status===404){
            setErrormsg("Some Error occured on our side. Please try again later.");
        }else{ 
            setLocalStorageData(response.data);
        }
    }
    useEffect(()=>{
        if(validated){
            //fetch details
            fetchdetails();
            //update local storage

            //navigate
            
        }
    },[validated]);
    useEffect(()=>{
        if(Object.keys(localstroageData).length!==0){
            localStorage.setItem("yogaUser",JSON.stringify(localstroageData));
            Navigate("/Dashboard");
        }
    },[localstroageData]);
    return (
        <div className="Signup">
            <h3>Credential</h3>
            <input type="email" placeholder="Email?" name="emailId"
            value={userCred.emailId} onChange={handleChange}></input>
            <input type="password" placeholder="Password?" name="password"
            value={userCred.password} onChange={handleChange}></input>
            <button onClick={handleSignIn}>Submit</button>
            {errormsg.length==0?<></>:<p>{errormsg}</p>}
        </div>
    );
}

export default SignIn;