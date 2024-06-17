import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const AddNewDoctor = ()=>{
    const {isAuthenticated} = useContext(Context);
    const [firstname, setFirstname] =useState("")
    const [lastname, setLastname] =useState("")
    const [email, setEmail] =useState("")
    const [phone, setPhone] =useState("")
    const [nic, setNic] =useState("")
    const [dob, setDob] =useState("")
    const [gender, setGender] =useState("") 
    const [password, setPassword] =useState("")
    const [docAvator, setDocAvator] = useState("")
    const [docAvatorPreview, setDocAvatorPreview] = useState("")
    const [doctorDepartment, setDoctorDepartment] = useState("")

    const departmentsArray = [
        
        "Pediatrics",
        "Orthopedics",
        "Cardiology",
        "Neurology",
        "Oncology",
        "Radiology",
        "Physical Therapy",
        "Dermatology",
        "ENT",]

 
    const navigateTo = useNavigate("");

    const handlerAvatar = async(e)=>{
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload=()=>{
            setDocAvatorPreview(reader.result);
            setDocAvator(file)
        }
    }

    const handlerAddNewDoctor = async(e)=>{
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("firstname", firstname)
            formData.append("lastname", lastname)
            formData.append("email", email)
            formData.append("phone", phone)
            formData.append("nic", nic)
            formData.append("dob", dob)
            formData.append("gender", gender)
            formData.append("password", password)
            formData.append("doctorDepartment", doctorDepartment)
            formData.append("docAvator", docAvator)

            const response =await axios.post("http://localhost:4000/api/v1/user/doctor/addnew", 
                formData,
              {
              withCredentials:true,
              headers: {
                "Content-Type": "multipart/form-data"
              },
        });
        toast.success(response.data.message);
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
           <div className="container form-component add-doctor-form">
            <img src="/logo.png" alt="logo" className="logo" />
            <h1 className="form-title">REGISTER NEW DOCTOR</h1>
          
           <form onSubmit={handlerAddNewDoctor}>
            <div className="first-wrapper">
                <div>
                    <img src={docAvatorPreview ? `${docAvatorPreview}`: "/docHolder.jpg"} alt="Doctor Avatar" />
                    <input type="file" onChange={handlerAvatar}/>
                </div>

            <div>
            <input type="text" placeholder="First Name" value={firstname} onChange={(e)=> setFirstname(e.target.value)} />
            <input type="text" placeholder="Last Name" value={lastname} onChange={(e)=> setLastname(e.target.value)} />

            <input type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} />
            
                <input type="number" placeholder="Phone" value={phone} onChange={(e)=> setPhone(e.target.value)} />

                <input type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} />
            
                <input type="date" placeholder="Date of Birth" value={dob} onChange={(e)=> setDob(e.target.value)} />

                <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
                <input type="number" placeholder="NIC" value={nic} onChange={(e)=> setNic(e.target.value)} />
                <select value={doctorDepartment} onChange={(e)=>setDoctorDepartment(e.target.value)}>

                    <option value="">Select Department</option>
                    {
                        departmentsArray.map((element, index) =>{
                            return(
                                <option value={element} key={index}>{element} </option>
                            )
                        })
                    }
                </select>
            <button type="submit">REGISTER NEW DOCTOR</button>

            </div>
            </div>
    

            

           </form>
        </div>


           </section>
        </>
    )
}
export default AddNewDoctor