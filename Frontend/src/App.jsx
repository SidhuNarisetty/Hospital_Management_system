import React, { useContext, useEffect } from "react";
import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import Appointment from "./Pages/Appointment";
import AboutUs from "./Pages/AboutUs";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Components/Navbar";
import { context } from "./main";
import axios from "axios";
import Footer from "./Components/Footer";

export default function App(){
  const {isAuthenticated, setIsAuthenticated,user,setUser} = useContext(context);
  useEffect(()=>{
    const fetUser = async() =>{
      try{
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/patient/me",
          {withCredentials:true}
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      }catch(error){
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetUser();
  },[isAuthenticated]);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element = {<Home />}/>
          <Route path="/appointment" element = {<Appointment />}/>
          <Route path="/about" element = {<AboutUs />}/>
          <Route path="/register" element = {<Register />}/>
          <Route path="/login" element = {<Login />}/>
        </Routes>
        <Footer />
        <ToastContainer position="top-center" />
      </Router>
    </>    
  );
}