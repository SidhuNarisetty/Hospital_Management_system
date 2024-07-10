import React from "react";
import AppointmentForm from "../Components/AppointmentForm.jsx";
import Hero from "../Components/Hero.jsx";

const Appointment = () => {
    return (
        <>
            <Hero title={"Schedule Your Appointment | ZeeCare Medical Institute"} imageUrl={"/signin.png"}/>
            <AppointmentForm />
        </>
    );
}

export default Appointment