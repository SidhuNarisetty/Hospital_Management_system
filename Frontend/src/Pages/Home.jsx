import React from "react";
import Hero from "../Components/Hero";
import Biography from "../Components/Biography";
import Departments from "../Components/Departments";
import MessageForm from "../Components/MessageForm";

const Home = () => {
    return <>
        <Hero 
            title={
                "Welcome to the ZeeCare Medical Institute | Your Trusted HealthCare provider"
            }
            imageUrl={"/hero.png"}
        />
        <Biography imageUrl={"/about.png"}/>
        <Departments />
        <MessageForm />
    </>
}

export default Home;