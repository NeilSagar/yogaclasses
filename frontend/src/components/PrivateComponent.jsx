import { Outlet,Navigate } from "react-router-dom";

const PrivateComponent=()=>{
    const auth=localStorage.getItem("yogaUser");
    return (
        auth?<Outlet/>:<Navigate to="/SignIn"/>
    );
}

export default PrivateComponent;