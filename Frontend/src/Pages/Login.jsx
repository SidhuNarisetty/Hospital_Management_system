import React, { useContext, useState } from "react";
import { context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
    const {isAuthenticated, setIsAuthenticated,user,setUser} = useContext(context);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (eve) => {
        eve.preventDefault();
        try{
            const response = await axios.post("http://localhost:4000/api/v1/user/login",
                {email,password,confirmPassword,role:"Patient"},
                {withCredentials:true, headers:{"Content-Type":"application/json"}}
            );
            toast.success(response.data.message);
            setIsAuthenticated(true);
            navigate("/");
        }catch(error){
            toast.error(error.response.data.message);
        }
    };

    if(isAuthenticated){
        return <Navigate to={"/"} />
    }
    return <div className="container form-component login-form">
        <h2>Sign In</h2>
        <p>Please Login to Continue</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi incidunt cum qui obcaecati, blanditiis quisquam.</p>
        <form onSubmit={handleLogin}>
            <input 
                type="text" 
                value={email} 
                onChange={(eve) => setEmail(eve.target.value)} 
                placeholder="Email"
            />
            <input 
                type="password"
                value={password} 
                onChange={(eve) => setPassword(eve.target.value)} 
                placeholder="Password"
            />
            <input 
                type="password"
                value={confirmPassword} 
                onChange={(eve) => setConfirmPassword(eve.target.value)} 
                placeholder="Confirm Password"
            />
            <div
                style={{
                    gap:"10px",
                    justifyContent: "flex-end",
                    flexDirection: "row",
                }}
            >
                <p style={{marginBottom: 0}}>Not Registered?</p>
                <Link to={"/register"} style={{textDecoration:"none",alignItems:"center"}}>Register Now</Link>
            </div>
            <div style={{justifyContent:"center",alignItems:"center"}}>
                <button type="submit">Log In</button>
            </div>
        </form>
    </div>;
}

export default Login