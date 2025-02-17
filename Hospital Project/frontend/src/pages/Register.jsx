import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = ()=>{
    const {isAuthenticated, setIsAuthenticated} = useContext(Context);
    const [firstname, setFirstname] =useState("")
    const [lastname, setLastname] =useState("")
    const [email, setEmail] =useState("")
    const [phone, setPhone] =useState("")
    const [password, setPassword] =useState("")
    const [dob, setDob] =useState("")
    const [nic, setNic] =useState("")
    const [gender, setGender] =useState("") 

    const navigate = useNavigate("");

    const handlerRegister = async(e)=>{
        e.preventDefault();
        try {
            const response =await axios.post("http://localhost:4000/api/v1/user/patient/register", 
              {firstname,lastname, email,phone, password , dob,nic,gender, role: "Patient"},
              {
              withCredentials:true,
              headers: {
                "Content-Type": "application/json"
              },
        });
        toast.success(response.data.message);
        setIsAuthenticated(true);  
        navigate("/");
    
        }catch (error) {
           toast.error(error.response.data.message) 
        }
    }
    if(isAuthenticated){
        return (
            <Navigate to={"/"}/>
        )
    }
    return (
        <div className="container form-component register">
           <h2>Sign Up</h2>
           <p> Please Sign Up to Continue</p>
           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa distinctio consectetur sequi unde cupiditate iure!</p>
           <form onSubmit={handlerRegister}>
            <div>
                <input type="text" placeholder="First Name" value={firstname} onChange={(e)=> setFirstname(e.target.value)} />
                <input type="text" placeholder="Last Name" value={lastname} onChange={(e)=> setLastname(e.target.value)} />
            </div>

            <div>
                <input type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} />
            
                <input type="number" placeholder="Phone" value={phone} onChange={(e)=> setPhone(e.target.value)} />
            </div>
            <div>
                <input type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} />
            
                <input type="date" placeholder="Date of Birth" value={dob} onChange={(e)=> setDob(e.target.value)} />
            </div>
            <div>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
                <input type="number" placeholder="NIC" value={nic} onChange={(e)=> setNic(e.target.value)} />
            </div>

            <div style={{gap: "10px", justifyContent: "flex-end", flexDirection: "row"}}>
            <p style={{marginBottom: 0}}>Already Register? </p>
            <Link to={"/login"} style={{textDecoration: "none", alignItems: "center"}}> Login Now</Link>
          </div>
          <div style={{justifyContent: "center", alignItems: "center"}}>
            <button type="submit">Register</button>
          </div>

           </form>
        </div>
    )
}

export default Register