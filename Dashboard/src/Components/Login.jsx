import React from 'react'
import { useContext } from 'react';
import { Context } from '../main';
import { useState } from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {Navigate} from "react-router-dom";

const Login = () => {
  const {isAuthenticated, setIsAuthenticated} = useContext(Context);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  
  const navigate = useNavigate();

  const handleLogin = async (eve) => {
      eve.preventDefault();
      try{
        await axios.post("http://localhost:4000/api/v1/user/login",
            {email,password,confirmPassword,role:"Admin"},
            {withCredentials:true, headers:{"Content-Type":"application/json"}}
        ).then((res)=>{
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigate("/");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        });
      }catch(error){
          console.log(error);
      }
  };

  if(isAuthenticated){
      return <Navigate to={"/"} />
  }

  return (
    <>
        <section className="container form-component">
            <img src="/logo.png" alt="logo" />
            <h1 className='form-title'>WELCOME to ZEECARE</h1>
            <p>Only Admins are allowed to Access these Resources</p>
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
                <div style={{justifyContent:"center",alignItems:"center"}}>
                    <button type="submit">Log In</button>
                </div>
            </form>
        </section>
    </>
  );
};

export default Login;
