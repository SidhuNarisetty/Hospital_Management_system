import React from 'react'
import { Context } from '../main';
import { useContext } from 'react';
import { useState } from 'react';
import { Navigate,useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


const AddNewAdmin = () => {
  const {isAuthenticated, setIsAuthenticated} = useContext(Context);
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [NIC,setNIC] = useState("");
  const [DoB,setDoB] = useState("");
  const [gender,setGender] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

    const handleAddNewAdmin = async (e) =>{
      e.preventDefault();
      try{
          await axios.post("http://localhost:4000/api/v1/user/admin/addnew",
            {firstName,lastName,email,phone,NIC,DoB,gender,password,role:"Admin"},
            {withCredentials:true, headers:{"Content-Type":"application/json"}}
          ).then((res)=>{
            toast.success(res.data.message);
            setIsAuthenticated(true);
            navigate("/");
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhone("");
            setNIC("");
            setDoB("");
            setGender("");
            setPassword("");
          });
      }catch(error){
          toast.error(error.response.data.message);
      }
    };

    if(!isAuthenticated){
        return <Navigate to={"/login"} />
    }
  return (
    <>
      <section className='page'>
        <section className="container form-component add-admin-form">
            <img src="/logo.png" alt="logo" className='logo'/>
            <h1 className='form-title'>ADD NEW ADMIN</h1>
            <form onSubmit={handleAddNewAdmin}>
                <div>
                    <input type="text" placeholder="First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                    <input type="text" placeholder="Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                </div>
                <div>
                    <input type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="text" placeholder="Phone Number" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                </div>
                <div>
                    <input type="text" placeholder="NIC" value={NIC} onChange={(e)=>setNIC(e.target.value)}/>
                    <input type="date" placeholder="Date of Birth" value={DoB} onChange={(e)=>setDoB(e.target.value)}/>
                </div>
                <div>
                    <select value={gender} onChange={(e)=>setGender(e.target.value)}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div style={{justifyContent:"center",alignItems:"center"}}>
                    <button type="submit">ADD NEW ADMIN</button>
                </div>
            </form>
        </section>
      </section>
    </>
  )
}

export default AddNewAdmin
