import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import Messages from "./Components/Messages";
import Doctors from "./Components/Doctors";
import AddNewDoctor from "./Components/AddNewDoctor";
import AddNewAdmin from "./Components/AddNewAdmin";
import Sidebar from './Components/Sidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { Context } from './main';
import axios from "axios";
import { useEffect } from 'react';
import "./App.css";

const App = () => {

  const {isAuthenticated,setIsAuthenticated,admin,setAdmin} = useContext(Context);

  useEffect(()=>{
    const fetUser = async() =>{
      try{
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/admin/me",
          {withCredentials:true}
        );
        setIsAuthenticated(true);
        setAdmin(response.data.user);
      }catch(error){
        setIsAuthenticated(false);
        setAdmin({});
      }
    };
    fetUser();
  },[isAuthenticated]);

  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/doctor/addnew" element={<AddNewDoctor/>}/>
        <Route path="/admin/addnew" element={<AddNewAdmin/>}/>
        <Route path="/messages" element={<Messages/>}/>
        <Route path="/doctors" element={<Doctors/>}/>
      </Routes>
      <ToastContainer position="top-center" />
    </Router>
  );
};

export default App
