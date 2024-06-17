import React from "react";
import Hero from "../components/Hero.jsx";
import Biography from "../components/Biography.jsx";
const About = ()=>{
    return (
        <>
           <Hero title={"Learn More About Us | SiddCare Medical Institude"} imageUrl={"/about.png"}/>
           <Biography imageUrl={"/whoweare.png"}/>
        </>
    )
}

export default About