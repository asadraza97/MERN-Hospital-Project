import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const AddNewAdmin = ()=>{
    const {isAuthenticated, setIsAuthenticated} = useContext(Context);
    const [firstname, setFirstname] =useState("")
    const [lastname, setLastname] =useState("")
    const [email, setEmail] =useState("")
    const [phone, setPhone] =useState("")
    const [password, setPassword] =useState("")
    const [dob, setDob] =useState("")
    const [nic, setNic] =useState("")
    const [gender, setGender] =useState("") 

    const navigateTo = useNavigate("");

    const handlerAddNewAdmin = async(e)=>{
        e.preventDefault();
        try {
            const response =await axios.post("http://localhost:4000/api/v1/user/admin/addnew", 
              {firstname,lastname, email,phone, password , dob,nic,gender},
              {
              withCredentials:true,
              headers: {
                "Content-Type": "application/json"
              },
        });
        toast.success(response.data.message);
        setIsAuthenticated(true);  
        navigateTo("/");
    
        }catch (error) {
           toast.error(error.response.data.message) 
        }
    }
    if(!isAuthenticated){
        return (
            <Navigate to={"/login"}/>
        )
    }


    return (
        <>
           <section className="page">
           <div className="container form-component add-admin-form">
            <img src="/logo.png" alt="logo" className="logo" />
            <h1 className="form-title"> ADD NEW ADMIN</h1>
          
           <form onSubmit={handlerAddNewAdmin}>
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

            <div style={{justifyContent: "center", alignItems: "center"}}>
            <button type="submit">ADD NEW ADMIN</button>
          </div>

           </form>
        </div>


           </section>
        </>
    )
}
export default AddNewAdmin