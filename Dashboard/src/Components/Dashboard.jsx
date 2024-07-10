import React from 'react'
import { Context } from '../main'
import { useContext } from 'react'
import { useState } from 'react';
import { Navigate } from "react-router-dom";
import { useEffect } from 'react';
import axios from "axios";
import {GoCheckCircleFill} from "react-icons/go";
import {AiFillCloseCircle} from "react-icons/ai";
import { toast } from "react-toastify";

const Dashboard = () => {
  const {isAuthenticated ,admin} = useContext(Context);
  const [appointments,setAppointsments] = useState([]);
  
  useEffect(()=>{
    const fetchAppointments = async()=>{
      try{
        const {data} = await axios.get("http://localhost:4000/api/v1/appointment/getall",{
          withCredentials:true,
        })
        setAppointsments(data.appointment)
      }catch(error){
        setAppointsments([]);
        console.log("Some Error occured While Fetching Appointments", error);
      }
    }
    fetchAppointments();
  },[]);

  const handleUpdateStatus = async (appointmentId, status) => {
    try{
      const {data} = await axios.put(
        `http://localhost:4000/api/v1/appointment/update/${appointmentId}`
      ,{status},{withCredentials:true});
      setAppointsments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  if(!isAuthenticated){
    return <Navigate to={'/login'}/>
  }

  return (
    <>
      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox">
            <img src="/doc.png" alt="docimg" />
            <div className="content">
              <div>
                <p>Hello .</p>
                <h5>{admin && `${admin.firstName} ${admin.lastName}`}</h5>
              </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit beatae neque quam ducimus consequatur voluptatem, placeat exercitationem dolore inventore, nostrum ab molestias enim corrupti rerum!
                </p>
            </div>
          </div>
          <div className="secondBox">
            <p>Total Appointments</p>
            <h3>{appointments.length}</h3>
          </div>
          <div className="thirdBox">
            <p>Registered Doctors</p>
            <h3>20</h3>
          </div>
        </div>
        <div className="banner">
          <h5>Appointments</h5>
          {
            appointments && appointments.length > 0 ? (appointments.map(appointment =>{
              return(
              <table>
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Date</th>
                    <th>Doctor</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Visited</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                <tr key={appointment._id}>
                  <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                  <td>{appointment.appointment_date.substring(0,16)}</td>
                  <td>
                    {`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}
                  </td>
                  <td>{appointment.department}</td>
                  <td>
                    <select className={appointment.status === "Pending" ? "value-pending": appointment.status === "Rejected" ? "value-rejected":"value-accepted"} 
                      value = {appointment.status}
                      onChange={(e) => handleUpdateStatus(appointment._id,e.target.value)}
                    >
                      <option value="Pending" className="value-pending">Pending</option>
                      <option value="Rejected" className="value-rejected">Rejected</option>
                      <option value="Accepted" className="value-accepted">Accepted</option>
                    </select>
                  </td>
                  <td>{appointment.hasVisited === true ? <GoCheckCircleFill className='green'/>:<AiFillCloseCircle className='red'/>}</td>
                </tr>
                </tbody>
              </table>
            )
          })) : (<h1>No Appointments</h1>)
        }
        </div>
      </section>
      
    </>
  )
}

export default Dashboard
