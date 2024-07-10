import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { Context } from '../main';
import { useEffect } from 'react';
import axios from "axios";
import {Navigate} from "react-router-dom";
import {toast} from "react-toastify";

const Messages = () => {
  const [messages,setMessages] = useState([]);
  const { isAuthenticated } = useContext(Context);
  
  useEffect(() =>{
  const fetchMessages = async() =>{
    try{
      const {data} = await axios.get(
        "http://localhost:4000/api/v1/message/getall",
        {withCredentials:true}
      );
      setMessages(data.messages);
    }catch(err){
      toast.error(err.response.data.message);
    }
  };
  fetchMessages();
  },[]);

  if(!isAuthenticated){
    return <Navigate to={"/login"} />
  }
  return (
    <section className='page messages'>
      <h1>MESSAGES</h1>
      <div className="banner">
        {
          messages && messages.length > 0 ? (messages.map((element)=>{
            return(
              <div className='card' key={element._id}>
                <div className="details">
                  <p>First Name: <span>{element.firstName}</span></p>
                  <p>Last Name: <span>{element.lastName}</span></p>
                  <p>Email: <span>{element.email}</span></p>
                  <p>Phone: <span>{element.phone}</span></p>
                  <p>Message: <span>{element.message}</span></p>
                </div>
              </div>
            );
          })) : (<h1>NO MESSAGES!</h1>)
        }
      </div>
    </section>
  );
};

export default Messages